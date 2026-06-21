import { Link } from "react-router-dom";
const role = localStorage.getItem("role");
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Ink & Relax
        </h1>

        <div className="flex gap-6">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/login">Admin</Link>
          {role === "ADMIN" && (

          
          <Link to="/admin">Admin</Link>

          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;