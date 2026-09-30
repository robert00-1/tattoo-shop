import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import Booking from "./pages/Booking";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ServicesManagement from "./pages/admin/ServicesManagement";
import MediaManagement from "./pages/admin/MediaManagement";
import AvailabilityManagement from "./pages/admin/AvailabilityManagement";
import SlotManagement from "./pages/admin/SlotManagement";
import AdminBookings from "./pages/admin/AdminBookings";
import PaymentManagement from "./pages/admin/PaymentManagement";
import AdminRoute from "./components/AdminRoute";
import Login from "./pages/Login";
import CryptoPayment from "./pages/CryptoPayment";
import PaymentPending from "./pages/PaymentPending";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/services"
          element={<Services />}
        />
        <Route
  path="/services/:id"
  element={<ServiceDetails />}
/>
    <Route
  path="/booking/:id"
  element={<Booking />}
/> 
  <Route
  path="/admin"
  element={<AdminDashboard />}
/>
  <Route
  path="/admin/services"
  element={<ServicesManagement />}
/>
   <Route
  path="/admin/media"
  element={<MediaManagement />}
/>
  <Route
  path="/admin/availability"
  element={<AvailabilityManagement />}
/>
 <Route
  path="/admin/slots"
  element={<SlotManagement />}
/>
<Route
  path="/admin/bookings"
  element={<AdminBookings />}
/> 
   <Route
  path="/admin/payments"
  element={<PaymentManagement />}
/>
  <Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }

/>

<Route path="/login" element={<Login />} />

<Route
  path="/admin/services"
  element={
    <AdminRoute>
      <ServicesManagement />
    </AdminRoute>
  }
/>

<Route
  path="/crypto-payment"
  element={<CryptoPayment />}
/>
<Route
    path="/payment-pending"
    element={<PaymentPending />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;