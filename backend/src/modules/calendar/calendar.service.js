import prisma from "../../config/db.js";

//
// 🟢 CLIENT CALENDAR (only available slots, next 7 days)
//
export const getClientCalendar = async (serviceId) => {
  const today = new Date();

  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const slots = await prisma.availabilitySlot.findMany({
    where: {
      serviceId,
      date: {
        gte: today,
        lte: nextWeek,
      },
      isBooked: false,
    },
    orderBy: {
      date: "asc",
    },
  });

  const grouped = {};

  for (const slot of slots) {
    const dateKey = slot.date.toISOString().split("T")[0];

    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }

    grouped[dateKey].push({
      id: slot.id,
      startTime: slot.startTime,
      endTime: slot.endTime,
    });
  }

  return grouped;
};

//
// 🔴 ADMIN CALENDAR (all slots, booked + available)
//
export const getAdminCalendar = async (serviceId) => {
  const today = new Date();

  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const slots = await prisma.availabilitySlot.findMany({
    where: {
      serviceId,
      date: {
        gte: today,
        lte: nextWeek,
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  const grouped = {};

  for (const slot of slots) {
    const dateKey = slot.date.toISOString().split("T")[0];

    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }

    grouped[dateKey].push({
      id: slot.id,
      startTime: slot.startTime,
      endTime: slot.endTime,
      isBooked: slot.isBooked,
    });
  }

  return grouped;
};