import express from "express";

import {
  createDeposit,
  getAll,
  checkout,
  stripeWebhook,
  stats,
  cryptoCheckout,
  uploadCryptoProof,
} from "./payment.controller.js";

import { authMiddleware } from "../../middleware/authMiddleware.js";
import { authorize } from "../../middleware/roleMiddleware.js";
import upload from "../../config/multer.js";

const router = express.Router();

// Get all payments
router.get("/", getAll);

// Create deposit payment
router.post("/deposit", createDeposit);

// Stripe checkout
router.post("/checkout/:paymentId", checkout);

// Crypto checkout
router.get("/crypto-checkout/:paymentId", cryptoCheckout);

// Upload crypto payment proof
router.post(
  "/:paymentId/upload-proof",
  upload.single("proof"),
  uploadCryptoProof
);

// Admin payment statistics
router.get(
  "/stats",
  authMiddleware,
  authorize("ADMIN"),
  stats
);

// Stripe webhook
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

export default router;