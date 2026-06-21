import express from "express";
import { upload } from "../../middleware/upload.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { authorize } from "../../middleware/roleMiddleware.js";

import {
  uploadMedia,
  deleteMedia,
  setCoverImage,
} from "./media.controller.js";

const router = express.Router();

router.post(
  "/:serviceId",
  authMiddleware,
  authorize("ADMIN"),
  upload.single("file"),
  uploadMedia
  
);
router.delete(
  "/:id",
  authMiddleware,
  authorize("ADMIN"),
  deleteMedia
);

router.patch(
  "/cover/:id",
  authMiddleware,
  authorize("ADMIN"),
  setCoverImage
);

export default router;