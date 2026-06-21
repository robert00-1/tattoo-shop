import express from "express";
import {
  getAll,
   getServiceSlots,
  createAvailability,
  generateSlots,
  deleteSlot,
  toggleSlot,
  createCustomSlot,
} from "./slot.controller.js";

import { authMiddleware } from "../../middleware/authMiddleware.js";
import { authorize } from "../../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", getAll);

router.get(
  "/service/:serviceId",

  getServiceSlots
);

router.post(
  "/availability",
  authMiddleware,
  authorize("ADMIN"),
  createAvailability
);

router.post(
  "/generate/:serviceId",
  authMiddleware,
  authorize("ADMIN"),
  generateSlots
);
router.delete(
  "/:id",
  authMiddleware,
  authorize("ADMIN"),
  deleteSlot
);
router.patch(
  "/toggle/:id",
  authMiddleware,
  authorize("ADMIN"),
  toggleSlot
);
router.post(
  "/custom",
  authMiddleware,
  authorize("ADMIN"),
  createCustomSlot
);
export default router;