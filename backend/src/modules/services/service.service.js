import prisma from "../../config/db.js";

export const createService = async (data) => {
  return prisma.service.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      duration: data.duration,
    },
  });
};

export const getAllServices = async () => {
  return prisma.service.findMany({
    include: {
      media: true,
    },
  });
};

export const getServiceById = async (id) => {
  return prisma.service.findUnique({
    where: { id },
    include: {
      media: true,
    },
  });
};

export const updateService = async (
  id,
  data
) => {
  return prisma.service.update({
    where: { id },
    data,
  });
};
export const deleteService = async (id) => {
  return prisma.$transaction(async (tx) => {

    const bookings = await tx.booking.findMany({
      where: {
        serviceId: id,
      },
    });

    console.log("BOOKINGS FOUND:", bookings);

    const deletedBookings = await tx.booking.deleteMany({
      where: {
        serviceId: id,
      },
    });

    console.log(
      "BOOKINGS DELETED:",
      deletedBookings
    );

    const deletedMedia = await tx.media.deleteMany({
      where: {
        serviceId: id,
      },
    });

    console.log(
      "MEDIA DELETED:",
      deletedMedia
    );

    return tx.service.delete({
      where: {
        id,
      },
    });
  });
};