import prisma from "../../config/db.js";
import { getAvailableSlots } from "./slot.service.js";

export const getAll = async (req, res) => {
  const slots = await getAvailableSlots();
  res.json(slots);
};

export const createAvailability = async (req, res) => {
  try {
    const availability = await prisma.serviceAvailability.create({
      data: req.body,
    });

    res.status(201).json({
      message: "Availability created successfully",
      availability,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const generateSlots = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const availability = await prisma.serviceAvailability.findMany({
      where: {
        serviceId,
        isActive: true,
      },
    });

    if (!availability.length) {
      return res.status(404).json({
        message: "No availability found for this service",
      });
    }

    const slots = [];

    for (const rule of availability) {
      const baseDate = new Date(rule.date); // ✅ use actual stored date

      const startHour = parseInt(rule.startTime.split(":")[0]);
      const endHour = parseInt(rule.endTime.split(":")[0]);

      for (let hour = startHour; hour < endHour; hour++) {
        const slotDate = new Date(baseDate);

        slotDate.setHours(hour, 0, 0, 0);

        slots.push({
          serviceId,
          date: slotDate,
          startTime: `${hour}:00`,
          endTime: `${hour + 1}:00`,
        });
      }
    }

    const result = await prisma.availabilitySlot.createMany({
      data: slots,
    });

    res.json({
      message: "Slots generated successfully",
      count: result.count,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getServiceSlots = async (req, res) => {
  try {
    const slots = await prisma.availabilitySlot.findMany({
      where: {
        serviceId: req.params.serviceId,
        
      },
      orderBy: {
        date: "asc",
      },
    });

    res.json(slots);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteSlot = async (req, res) => {
  try {
    await prisma.availabilitySlot.delete({
      where: {
        id: req.params.id,
      },
    });

    res.json({
      message: "Slot deleted",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const toggleSlot = async (req, res) => {
  const slot =
    await prisma.availabilitySlot.findUnique({
      where: {
        id: req.params.id,
      },
    });

  const updated =
    await prisma.availabilitySlot.update({
      where: {
        id: req.params.id,
      },
      data: {
        isActive: !slot.isActive,
      },
    });

  res.json(updated);
};
export const stats = async (req, res) => {
  try {
    console.log("STATS ENDPOINT HIT");

    const result = await getPaymentStats();

    res.json(result);
  } catch (err) {
    console.error("STATS ERROR:", err);

    res.status(400).json({
      message: err.message,
    });
  }
};
export const createCustomSlot = async (
  req,
  res
) => {
  try {
    const {
      serviceId,
      date,
      startTime,
      endTime,
    } = req.body;

    const slot =
      await prisma.availabilitySlot.create({
        data: {
          serviceId,
          date: new Date(date),
          startTime,
          endTime,
        },
      });

    res.status(201).json(slot);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};