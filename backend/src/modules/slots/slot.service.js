import prisma from "../../config/db.js";


export const getAvailableSlots = async () => {
    return prisma.availabilitySlot.findMany({
        where: {
            isBooked: false,
        },
        orderBy: {
            date: "asc",
        },
    });
};