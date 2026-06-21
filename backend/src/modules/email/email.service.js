import { resend } from "../../config/resend.js";

const FROM_EMAIL = process.env.EMAIL_FROM;

// 📩 BOOKING CONFIRMATION EMAIL
export const sendBookingConfirmationEmail = async (booking) => {
  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: booking.email,
      subject: "Booking Confirmed 🎉",
      html: `
        <h2>Booking Confirmed</h2>
        <p>Hi ${booking.customerName},</p>

        <p>Your booking has been created successfully.</p>

        <h3>Details:</h3>
        <ul>
          <li>Service ID: ${booking.serviceId}</li>
          <li>Slot ID: ${booking.slotId}</li>
          <li>Total: $${booking.totalAmount}</li>
          <li>Deposit: $${booking.depositAmount}</li>
        </ul>

        <p>We look forward to seeing you!</p>
      `,
    });

    console.log("BOOKING EMAIL SENT:", result?.id);
    return result;
  } catch (err) {
    console.error("BOOKING EMAIL FAILED:", err.message);
  }
};

// 💳 PAYMENT SUCCESS EMAIL
export const sendPaymentSuccessEmail = async (booking) => {
  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: booking.email,
      subject: "Payment Received ✅",
      html: `
        <h2>Payment Successful</h2>
        <p>Hi ${booking.customerName},</p>

        <p>Your payment has been received successfully.</p>

        <p><strong>Status:</strong> ${booking.status}</p>

        <p>Thank you for your payment!</p>
      `,
    });

    console.log("PAYMENT EMAIL SENT:", result?.id);
    return result;
  } catch (err) {
    console.error("PAYMENT EMAIL FAILED:", err.message);
  }
};