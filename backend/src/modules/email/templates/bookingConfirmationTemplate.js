export const bookingConfirmationTemplate = (booking) => {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
    
    <h2 style="color: #4CAF50;">Booking Confirmed 🎉</h2>

    <p>Hi <strong>${booking.customerName}</strong>,</p>

    <p>Your booking has been successfully created.</p>

    <hr/>

    <h3>📅 Booking Details</h3>

    <ul>
      <li><strong>Service ID:</strong> ${booking.serviceId}</li>
      <li><strong>Slot ID:</strong> ${booking.slotId}</li>
      <li><strong>Total Amount:</strong> $${booking.totalAmount}</li>
      <li><strong>Deposit:</strong> $${booking.depositAmount}</li>
      <li><strong>Remaining:</strong> $${booking.remainingAmount}</li>
      <li><strong>Status:</strong> ${booking.status}</li>
    </ul>

    <hr/>

    <p style="color: #777;">
      Please arrive 10 minutes early. If you need to reschedule, contact support.
    </p>

    <p style="margin-top: 20px;">
      Thanks,<br/>
      <strong>Tattoo & Massage Spa</strong>
    </p>

  </div>
  `;
};