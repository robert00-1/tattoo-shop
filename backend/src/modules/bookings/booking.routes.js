import express from "express";
import {
  createBooking,
  getAll,
  confirm,
  cancel,
  fullyPaid,
  complete,
} from "./booking.controller.js";

import { authMiddleware } from "../../middleware/authMiddleware.js";
import { authorize } from "../../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", createBooking);

router.get(
  "/",
  authMiddleware,
  authorize("ADMIN"),
  getAll
);

router.patch(
  "/:id/confirm",
  authMiddleware,
  authorize("ADMIN"),
  confirm
);

router.patch(
  "/:id/cancel",
  authMiddleware,
  authorize("ADMIN"),
  cancel
);
router.patch(
  "/:id/full-payment",
  authMiddleware,
  authorize("ADMIN"),
  fullyPaid
);

router.patch(
  "/:id/complete",
  authMiddleware,
  authorize("ADMIN"),
  complete
);

export default router;