import AdminSidebar from "../../components/admin/AdminSidebar";

function AdminDashboard() {

    return (
        <div className="flex">
         <AdminSidebar />

         <div className="flex-1 p-10">
            <h1 className="flex-4xl font-bold">
                Dashboard
            </h1>

            <div className="grid md:grid-cols-4 gap-6 mt-10">
                <h2>Total Services</h2>
            </div>
            <div className="bg-white shadow rounded-xl p-6">
                <h2>Total Bookings</h2>
            </div>
            <div className="bg-white shadow rounded-xl p-6">
                <h2>Total Payments</h2>
            </div>
            <div className="bg-white shadow rounded-xl p-6">
                <h2>Available Slots</h2>
            </div>
         </div>

        </div>
    );
}

export default AdminDashboard;