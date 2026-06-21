import prisma from "../../config/db.js";

export const createReview = async (
  serviceId,
  name,
  rating,
  comment
) => {
  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });

  if (!service) {
    throw new Error("Service not found");
  }

  return prisma.review.create({
    data: {
      serviceId,
      name,
      rating,
      comment,
    },
  });
};

export const getServiceReviews = async (
  serviceId
) => {
  return prisma.review.findMany({
    where: {
      serviceId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};