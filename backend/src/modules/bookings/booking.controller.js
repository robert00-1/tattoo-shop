import {
  createBooking as createBookingService,
  getBookings,
  confirmBooking,
  cancelBooking,
  markFullyPaid,
  completeBooking,
} from "./booking.service.js";

// CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    const { slotId, customerName, email, phone, notes } = req.body;

    const booking = await createBookingService({
      slotId,
      customerName,
      email,
      phone,
      notes,
    });

    return res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// GET ALL BOOKINGS
export const getAll = async (req, res) => {
  try {
    const bookings = await getBookings();

    return res.json(bookings);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// CONFIRM BOOKING
export const confirm = async (req, res) => {
  try {
    const booking = await confirmBooking(req.params.id);

    return res.json({
      message: "Booking confirmed",
      booking,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// CANCEL BOOKING
export const cancel = async (req, res) => {
  try {
    const booking = await cancelBooking(req.params.id);

    return res.json({
      message: "Booking cancelled",
      booking,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const fullyPaid = async (req, res) => {
  try {
    const booking = await markFullyPaid(req.params.id);

    return res.json({
      message: "Booking marked as fully paid",
      booking,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
// COMPLETE BOOKING
export const complete = async (req, res) => {
  try {
    const booking = await completeBooking(req.params.id);

    return res.json({
      message: "Booking completed",
      booking,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
