import express from "express";

import {
  createDeposit,
  getAll,
  checkout,
  stripeWebhook,
  stats,
} from "./payment.controller.js";

import { authMiddleware } from "../../middleware/authMiddleware.js";
import { authorize } from "../../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", getAll);

router.post("/deposit", createDeposit);

router.post("/checkout/:paymentId", checkout);

router.get(
  "/stats",
  authMiddleware,
  authorize("ADMIN"),
  stats
);

export default router;