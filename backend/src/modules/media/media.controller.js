import prisma from "../../config/db.js";
import { deleteMediaById } from "./media.service.js";


export const uploadMedia = async (req, res) => {
  try {
    const { serviceId } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;

    const fileType = req.file.mimetype.startsWith("video")
      ? "VIDEO"
      : "IMAGE";

    const media = await prisma.media.create({
      data: {
        serviceId,
        url: fileUrl,
        type: fileType,
      },
    });

    res.status(201).json({
      message: "Media uploaded successfully",
      media,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const deleteMedia = async (req, res) => {
  try {
    const media = await deleteMediaById(req.params.id);

    res.json({
      message: "Media deleted successfully",
      media,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
export const setCoverImage = async (req, res) => {
  try {
    const { id } = req.params;

    const media = await prisma.media.findUnique({
      where: { id },
    });

    if (!media) {
      return res.status(404).json({
        message: "Media not found",
      });
    }

    // Remove old cover image
    await prisma.media.updateMany({
      where: {
        serviceId: media.serviceId,
      },
      data: {
        isCover: false,
      },
    });

    // Set new cover image
    const updatedMedia = await prisma.media.update({
      where: { id },
      data: {
        isCover: true,
      },
    });

    res.json({
      message: "Cover image updated",
      media: updatedMedia,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};