import prisma from "../../config/db.js";

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const generateWeeklySlots = async () => {
  const slots = [];

  const startDate = new Date(); // today

  const times = [
    { start: "10:00", end: "11:00" },
    { start: "12:00", end: "13:00" },
    { start: "14:00", end: "15:00" },
  ];

  for (let i = 0; i < 7; i++) {
    const currentDate = addDays(startDate, i);

    for (const t of times) {
      slots.push({
        date: currentDate,
        startTime: t.start,
        endTime: t.end,
      });
    }
  }

  return prisma.availabilitySlot.createMany({
    data: slots,
  });
};