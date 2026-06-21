import prisma from "../../config/db.js";
import { sendBookingConfirmationEmail } from "../email/email.service.js";

// CREATE BOOKING
export const createBooking = async (data) => {
  const booking = await prisma.$transaction(async (tx) => {
    const slot = await tx.availabilitySlot.findUnique({
      where: { id: data.slotId },
    });

    if (!slot) throw new Error("Slot not found");
    if (slot.isBooked) throw new Error("Slot already booked");

    const service = await tx.service.findUnique({
      where: { id: slot.serviceId },
    });

    if (!service) throw new Error("Service not found");

    const totalAmount = service.price;
    const depositAmount = totalAmount * 0.3;
    const remainingAmount = totalAmount - depositAmount;

    const booking = await tx.booking.create({
      data: {
        serviceId: slot.serviceId,
        slotId: data.slotId,
        customerName: data.customerName,
        email: data.email,
        phone: data.phone,
        notes: data.notes,
        totalAmount,
        depositAmount,
        remainingAmount,
        status: "PENDING_DEPOSIT",
      },
    });

    await tx.availabilitySlot.update({
      where: { id: data.slotId },
      data: { isBooked: true },
    });

    return booking;
  });

  // ✅ EMAIL (OUTSIDE TRANSACTION)
  setImmediate(async () => {
    try {
      await sendBookingConfirmationEmail(booking);
      console.log("📧 BOOKING EMAIL SENT SUCCESSFULLY:", booking.email);
    } catch (err) {
      console.error("❌ EMAIL FAILED:", err.message);
    }
  });

  return booking;
};

// GET ALL BOOKINGS
export const getBookings = async () => {
  return prisma.booking.findMany({
    include: {
      service: true,
      slot: true,
      payments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// CONFIRM BOOKING
export const confirmBooking = async (id) => {
  return prisma.booking.update({
    where: { id },
    data: { status: "CONFIRMED" },
  });
};


export const markFullyPaid = async (id) => {
  return prisma.booking.update({
    where: { id },
    data: {
      status: "FULLY_PAID",
    },
  });
};


// CANCEL BOOKING
export const cancelBooking = async (id) => {
  return await prisma.$transaction(async (tx) => {
    const booking = await tx.booking.findUnique({
      where: { id },
    });

    if (!booking) throw new Error("Booking not found");

    await tx.availabilitySlot.update({
      where: { id: booking.slotId },
      data: { isBooked: false },
    });

    return tx.booking.update({
      where: { id },
      data: { status: "CANCELLED" },
    });
  });
};

// COMPLETE BOOKING
export const completeBooking = async (id) => {
  return prisma.booking.update({
    where: { id },
    data: { status: "COMPLETED" },
  });
};