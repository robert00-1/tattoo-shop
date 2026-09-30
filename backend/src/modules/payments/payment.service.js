import stripe from "../../config/stripe.js";
import prisma from "../../config/db.js";

export const createDepositPayment = async (bookingId, provider) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  const payment = await prisma.payment.create({
    data: {
      bookingId,
      amount: booking.depositAmount,
      paymentType: "DEPOSIT",
      provider,
      status: "PENDING",
    },
  });

  return payment;
};

export const getPayments = async () => {
  return prisma.payment.findMany({
    include: {
      booking: {
        include: {
          service: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
export const createCheckoutSession = async (paymentId) => {
  try {
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: { booking: true },
    });

    if (!payment) {
      throw new Error("Payment not found");
    }

    if (!payment.amount) {
      throw new Error("Payment amount missing");
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Tattoo/Massage Deposit`,
            },
            unit_amount: Math.round(Number(payment.amount) * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",

      success_url:
        "https://geology-appear-tinsmith.ngrok-free.dev/payment-success?session_id={CHECKOUT_SESSION_ID}",

      cancel_url:
        "https://geology-appear-tinsmith.ngrok-free.dev/payment-cancelled",

      metadata: {
        paymentId: payment.id,
        bookingId: payment.bookingId,
      },
    });

    return session;
  } catch (error) {
    console.error("Stripe checkout error:", error.message);
    throw error;
  }
};
export const handleSuccessfulPayment = async (
  paymentId,
  bookingId,
  transactionId
) => {
  const payment = await prisma.payment.findUnique({
    where: {
      id: paymentId,
    },
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  // Prevent duplicate webhook processing
  if (payment.status === "PAID") {
    return payment;
  }

  await prisma.payment.update({
    where: {
      id: paymentId,
    },
    data: {
      status: "PAID",
      transactionId,
    },
  });

  await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: "CONFIRMED",
    },
  });

  return true;
};

export const getPaymentStats = async () => {
  const payments = await prisma.payment.findMany();

  return {
    totalRevenue: payments
      .filter((p) => p.status === "PAID")
      .reduce((sum, p) => sum + p.amount, 0),

    paidPayments: payments.filter(
      (p) => p.status === "PAID"
    ).length,

    pendingPayments: payments.filter(
      (p) => p.status === "PENDING"
    ).length,

    failedPayments: payments.filter(
      (p) => p.status === "FAILED"
    ).length,

    deposits: payments.filter(
      (p) => p.paymentType === "DEPOSIT"
    ).length,

    balances: payments.filter(
      (p) => p.paymentType === "BALANCE"
    ).length,
  };
};
export const createCryptoCheckout = async (paymentId) => {
  const payment = await prisma.payment.findUnique({
    where: {
      id: paymentId,
    },
  });

  if (!payment) {
    throw new Error("Payment not found");
    
    }

    const wallet = await prisma.wallet.findFirst({
      where: {
        isActive: true,
      },
    });

    if (!wallet) {
      throw new Error("No active wallet found");
    }

    return {
      paymentId: payment.id,
      bookingId: payment.bookingId,

      amount: payment.amount,

      currency: wallet.currency,
      network: wallet.network,
      walletAddress: wallet.walletAddress,

      status: payment.status,
    };
  };
  export const saveCryptoProof = async (
  paymentId,
  proofImage,
  txHash
) => {
  const payment = await prisma.payment.findUnique({
    where: {
      id: paymentId,
    },
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  return await prisma.payment.update({
    where: {
      id: paymentId,
    },
    data: {
      proofImage,
      txHash,
      status: "PENDING",
    },
  });
};
