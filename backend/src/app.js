import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./modules/auth/auth.routes.js";
import serviceRoutes from "./modules/services/service.routes.js";
import slotRoutes from "./modules/slots/slot.routes.js";
import bookingRoutes from "./modules/bookings/booking.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";
import mediaRoutes from "./modules/media/media.routes.js";
import paymentRoutes from "./modules/payments/payment.routes.js";
import { stripeWebhook } from "./modules/payments/payment.controller.js";
import calendarRoutes from "./modules/calendar/calendar.routes.js";
import path from "path";
import reviewRoutes from "./modules/reviews/review.routes.js";
dotenv.config();

const app = express(); // ✅ FIX 1: use express(), not Router

app.use(cors());

/*
  Stripe webhook MUST come before express.json()
*/
app.post(
  "/api/payments/webhook", // ✅ FIX 2: use app not router
  express.raw({ type: "application/json" }),
  stripeWebhook
);

// ⚠️ Stripe raw body route must come BEFORE this
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.json({
    message: "Tattoo & Massage API Running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/calendar", calendarRoutes);
app.use(
  "/uploads",
  express.static("uploads")
);
app.use("/api/reviews", reviewRoutes);
export default app;