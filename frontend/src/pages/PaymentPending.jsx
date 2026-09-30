import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PaymentPending() {
  return (
    <>
      <Navbar />

      <section className="min-h-screen flex items-center justify-center bg-gray-100">

        <div className="bg-white p-10 rounded-xl shadow-xl text-center max-w-xl">

          <div className="text-6xl mb-4">
            ⏳
          </div>

          <h1 className="text-4xl font-bold mb-4">
            Payment Submitted
          </h1>

          <p className="text-gray-600 mb-6">
            We have received your payment proof.
            Our team will verify the transaction shortly.
          </p>

          <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4">

            <p className="font-semibold">
              Booking Status
            </p>

            <p className="text-yellow-700">
              Waiting for payment verification
            </p>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default PaymentPending;