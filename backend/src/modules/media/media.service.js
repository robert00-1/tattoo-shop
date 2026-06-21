import prisma from "../../config/db.js";

export const deleteMediaById = async (id) => {
  const media = await prisma.media.findUnique({
    where: { id },
  });

  if (!media) {
    throw new Error("Media not found");
  }

  await prisma.media.delete({
    where: { id },
  });

  return media;
};