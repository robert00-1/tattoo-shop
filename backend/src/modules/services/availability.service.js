import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Check if a service can be booked at a given date/time
 */
export async function isServiceAvailable(serviceId, dateTime) {
  const date = new Date(dateTime);

  const dayOfWeek = date.getDay(); // 0-6
  const time = date.toTimeString().slice(0, 5); // "HH:MM"

  // 1. Get weekly rules
  const rules = await prisma.serviceAvailability.findMany({
    where: {
      serviceId,
      dayOfWeek,
      isActive: true,
    },
  });

  if (rules.length === 0) {
    return { available: false, reason: "No working hours" };
  }

  // 2. Check if time falls within any rule
  const inWorkingHours = rules.some((r) => {
    return r.startTime <= time && time < r.endTime;
  });

  if (!inWorkingHours) {
    return { available: false, reason: "Outside working hours" };
  }

  // 3. Check slot conflict (IMPORTANT)
  const conflict = await prisma.availabilitySlot.findFirst({
    where: {
      serviceId,
      date: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lt: new Date(date.setHours(23, 59, 59, 999)),
      },
      startTime: time,
      booking: {
        isNot: null,
      },
    },
    include: {
      booking: true,
    },
  });

  if (conflict) {
    return { available: false, reason: "Slot already booked" };
  }

  return { available: true };
}