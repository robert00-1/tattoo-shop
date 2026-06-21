import express from "express";
import {
  clientCalendar,
  adminCalendar,
} from "./calendar.controller.js";

import { authMiddleware } from "../../middleware/authMiddleware.js";
import { authorize } from "../../middleware/roleMiddleware.js";

const router = express.Router();

// CLIENT VIEW
router.get("/client/:serviceId", clientCalendar);

// ADMIN VIEW
router.get(
  "/admin/:serviceId",
  authMiddleware,
  authorize("ADMIN"),
  adminCalendar
);

export default router;