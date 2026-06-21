import { useLocation } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Booking() {
  const { state } = useLocation();

  const service = state?.service;
  const slot = state?.slot;

  if (!service || !slot) {
    return (
      <>
        <Navbar />

        <section className="pt-32 pb-20">
          <div className="max-w-3xl mx-auto px-6">
            <h1 className="text-3xl font-bold text-red-600">
              Booking information missing
            </h1>
          </div>
        </section>

        <Footer />
      </>
    );
  }

  const depositAmount = service.price * 0.3;

const [formData, setFormData] = useState({
  customerName: "",
  email: "",
  phone: "",
  notes: "",
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // STEP 1: CREATE BOOKING

    const bookingResponse = await api.post("/bookings", {
      slotId: slot.id,
      customerName: formData.customerName,
      email: formData.email,
      phone: formData.phone,
      notes: formData.notes,
    });
      console.log(formData);
    const booking = bookingResponse.data.booking;

    // STEP 2: CREATE DEPOSIT PAYMENT

    const paymentResponse = await api.post("/payments/deposit", {
      bookingId: booking.id,
    });

    const payment = paymentResponse.data.payment;

    // STEP 3: CREATE STRIPE CHECKOUT SESSION

    const checkoutResponse = await api.post(
      `/payments/checkout/${payment.id}`
    );

    // STEP 4: REDIRECT TO STRIPE

    window.location.href =
      checkoutResponse.data.checkoutUrl;

  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Booking failed"
    );
  }
};
  return (
    <>
      <Navbar />

      <section className="pt-32 pb-20 bg-gray-100 min-h-screen">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">

          <h1 className="text-4xl font-bold mb-8">
            Complete Booking
          </h1>

          {/* Booking Summary */}

          <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Booking Summary
            </h2>

            <p className="mb-2">
              <strong>Service:</strong>{" "}
              {service.name}
            </p>

            <p className="mb-2">
              <strong>Date:</strong>{" "}
              {new Date(slot.date).toLocaleDateString()}
            </p>

            <p className="mb-2">
              <strong>Time:</strong>{" "}
              {slot.startTime}
            </p>

            <p className="mb-2">
              <strong>Price:</strong> $
              {service.price}
            </p>

            <p className="mb-2 text-red-600 font-bold">
              <strong>Deposit Required:</strong> $
              {depositAmount}
            </p>
          </div>

          {/* Customer Form */}

          <form  onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block mb-2 font-medium">
                Full Name
              </label>

              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full border rounded-lg p-3"
              />
            </div>
            <div>
  <label className="block mb-2 font-medium">
    Notes
  </label>

  <textarea
    name="notes"
    value={formData.notes}
    onChange={handleChange}
    placeholder="Optional notes"
    className="w-full border rounded-lg p-3"
    rows="4"
  />
</div>
            <button
              type="submit"
              className="
                w-full
                bg-red-600
                text-white
                py-4
                rounded-lg
                hover:bg-red-700
              "
            >
              Pay Deposit (${depositAmount})
            </button>

          </form>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default Booking;