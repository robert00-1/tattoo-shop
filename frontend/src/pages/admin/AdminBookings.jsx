import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminSidebar from "../../components/admin/AdminSidebar";

function AdminBookings() {
    const [bookings, setBookings] = useState([]);

    const fetchBookings = async () => {
        try {
            const res = await api.get("/bookings");

            console.log(res.data);
            setBookings(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const confirmBooking = async (id) => {
        try {
            await api.patch(`/bookings/${id}/confirm`);
            fetchBookings();
        } catch (err) {
            console.error(err);
        }
    };

    const cancelBooking = async (id) => {
        try {
            await api.patch(`/bookings/${id}/cancel`);
            fetchBookings();
        } catch (err) {
            console.error(err);
        }
    };

    const markFullyPaid = async (id) => {
        try {
            await api.patch(`/bookings/${id}/full-payment`);
            fetchBookings();
        } catch (err) {
            console.error(err);
        }
    };
    const completeBooking = async (id) => {
        try {
            await api.patch(`/bookings/${id}/complete`);
            fetchBookings();
        } catch (err) {
            console.error(err)
        }
    };

    return (
        <div className="flex">
            <AdminSidebar />

            <div className="flex-1 p-10">
                <h1 className="text-4xl font-bold mb-8">
                    Booking Management
                </h1>

                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-4 text-left">Customer</th>
                                <th className="p-4 text-left">Service</th>
                                <th className="p-4 text-left">Date</th>
                                <th className="p-4 text-left">Status</th>
                                <th className="p-4 text-left">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {bookings.map((booking) => (
                                <tr
                                key={booking.id}
                                className="border-t"
                                >
                                    <td className="p-4">
                                        {booking.customerName  || "No Name"} 
                                    </td>

                                    <td className="p-4">
                                        {booking.service?.name}
                                    </td>

                                    <td className="p-4">
                                        {new Date(
                                            booking.slot?.date
                                        ).toLocaleDateString()}
                                        {""}
                                        {booking.slot?.startTime}
                                    </td>

                                    <td className="p-4">
                                        {booking.status}
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2 flex-wrap">

                                            <button
                                            onClick={() =>
                                                confirmBooking(
                                                    booking.id
                                                )
                                            }
                                            className="bg-blue-600 text-white px-3 py-2 rounded"
                                            >Confirm</button>
                                            <button
                                            onClick={() => 
                                                markFullyPaid(
                                                    booking.id
                                                )
                                            }
                                            className="bg-green-600 text-white px-3 py-2 rounded"
                                            >Fully Paid</button>

                                            <button 
                                            onClick={() =>
                                                completeBooking(
                                                    booking.id
                                                )
                                             }
                                             className="bg-purple-600 text-white px-3 py-2 rounded"
                                            >Complete</button>

                                            <button onClick={() => 
                                                cancelBooking(
                                                    booking.id
                                                )
                                            }
                                            className="bg-red-600 text-white px-3 py-2 rounded"
                                            >Cancel</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminBookings;