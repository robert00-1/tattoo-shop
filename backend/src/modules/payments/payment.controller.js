import Stripe from "stripe";
import prisma from "../../config/db.js";

import {
  createDepositPayment,
  getPayments,
  createCheckoutSession,
  handleSuccessfulPayment,
  getPaymentStats,
  createCryptoCheckout,
  saveCryptoProof,
} from "./payment.service.js";


import { sendPaymentSuccessEmail } from "../email/email.service.js";



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//
// 💰 CREATE DEPOSIT
//
export const createDeposit = async (req, res) => {
  try {
    const payment = await createDepositPayment(req.body.bookingId, req.body.provider);

    res.status(201).json({
      message: "Deposit payment created",
      payment,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

//
// 📄 GET ALL PAYMENTS
//
export const getAll = async (req, res) => {
  try {
    const payments = await getPayments();

    res.json(payments);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

//
// 🧾 CREATE STRIPE CHECKOUT SESSION
//
export const checkout = async (req, res) => {
  try {
    const session = await createCheckoutSession(req.params.paymentId);

    res.json({
      checkoutUrl: session.url,
      sessionId: session.id,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

//
// 🔔 STRIPE WEBHOOK
//
export const stripeWebhook = async (req, res) => {
  console.log("================================");
  console.log("WEBHOOK HIT");
  console.log("================================");

  const sig = req.headers["stripe-signature"];

  console.log("SIGNATURE PRESENT:", !!sig);

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log("EVENT VERIFIED SUCCESSFULLY");
    console.log("EVENT TYPE:", event.type);
  } catch (err) {
    console.error("================================");
    console.error("STRIPE WEBHOOK ERROR");
    console.error(err.message);
    console.error("================================");

    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  //
  // 🎯 HANDLE SUCCESSFUL PAYMENT
  //
  if (event.type === "checkout.session.completed") {
    console.log("================================");
    console.log("CHECKOUT SESSION COMPLETED");
    console.log("================================");

    const session = event.data.object;

    console.log("SESSION ID:", session.id);
    console.log("PAYMENT INTENT:", session.payment_intent);
    console.log("PAYMENT ID:", session.metadata?.paymentId);
    console.log("BOOKING ID:", session.metadata?.bookingId);

    try {
      // 1. Update DB (payment + booking)
      await handleSuccessfulPayment(
        session.metadata.paymentId,
        session.metadata.bookingId,
        session.payment_intent
      );

      console.log("PAYMENT UPDATED SUCCESSFULLY");
      console.log("BOOKING CONFIRMED SUCCESSFULLY");

      // 2. Send email
      const booking = await prisma.booking.findUnique({
        where: { id: session.metadata.bookingId },
      });

      if (booking) {
        await sendPaymentSuccessEmail(booking);
        console.log("PAYMENT EMAIL SENT");
      }
    } catch (error) {
      console.error("DATABASE UPDATE FAILED");
      console.error(error.message);
    }
  }

  console.log("WEBHOOK FINISHED");

  return res.json({
    received: true,
  });
};
export const stats = async (req, res) => {
  try {
    const data = await getPaymentStats();

    res.json(data);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

export const cryptoCheckout = async (req, res) => {
  try {
    const data = await createCryptoCheckout(req.params.paymentId);

    res.json(data);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
export const uploadCryptoProof = async (req, res) => {
  try {
    const payment = await saveCryptoProof(
      req.params.paymentId,
      req.file.path,
      req.body.txHash
    );

    res.json({
      message: "Payment proof uploaded successfully",
      payment,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};