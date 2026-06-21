import { Link } from "react-router-dom";

function AdminSidebar() {

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <div className="w-64 bg-black text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">
        Admin Portal
      </h1>

      <nav className="flex flex-col gap-4">
        <Link to="/admin/services">
          Services
        </Link>

        <Link to="/admin/availability">
          Availability
        </Link>

        <Link to="/admin/bookings">
          Bookings
        </Link>

        <Link to="/admin/payments">
          Payments
        </Link>

        <Link to="/admin/media">
          Media Management
        </Link>

        <Link to="/admin/slots">
          Slots
        </Link>

        <button
          onClick={logout}
          className="mt-10 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-left"
        >
          Logout
        </button>
      </nav>
    </div>
  );
}

export default AdminSidebar;