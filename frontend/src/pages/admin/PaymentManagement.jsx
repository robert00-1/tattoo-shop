import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminSidebar from "../../components/admin/AdminSidebar";

function PaymentsManagement() {
    const [payments, setPayments] = useState([]);
    const [stats, setStats] = useState(null);

    const fetchPayments = async () => {
        try {
            const res = await api.get("/payments");
            setPayments(res.data);
        } catch (err) {
        console.error(err);
        }
    };

    const fetchStats = async () => {
        try {
            const res = await api.get("/payments/stats");
            setStats(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchPayments();
        fetchStats();
    }, []);

    return (
        <div className="flex">
            <AdminSidebar />
            <div className="flex-1 p-10">
                <h1 className="text-4xl font-bold mb-8">
                    Payment Management
                </h1>

                {
                    stats && (
                        <div className="grid grid-cols-4 gap-6 mb-10">
                            <div className="bg-white p-6 rounded-xl shadow">
                                <h3 className="text-gray-500">
                                    Revenue
                                </h3>
                                <p className="text-3xl font-bold">
                                    ${stats.totalRevenue}
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow">
                                <h3 className="text-gray-500">
                                    Paid
                                </h3>
                                <p className="text-3xl font-bold text-green-600">
                                    {stats.paidPayments}
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow">
                                <h3 className="text-gray-500">
                                    Pending
                                </h3>
                                <p className="text-3xl font-bold text-yellow-500">
                                    {stats.pendingPayments}
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow">
                                <h3 className="text-gray-500">
                                    Failed
                                </h3>

                                <p className="text-3xl font-bold text-red-500">
                                    {stats.failedPayments}
                                </p>
                            </div>
                        </div>
                    )
                }

                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-4 text-left">
                                    Customer
                                </th>
                                <th className="p-4 text-left">
                                    Service
                                </th>
                                <th className="p-4 text-left">
                                    Amount
                                </th>
                                <th className="p-4 text-left">
                                    Type
                                </th>
                                <th className="p-4 text-left">
                                    Status
                                </th>
                                <th className="p-4 text-left">
                                    Date
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {payments.map((payment) => (
                                <tr
                                key={payment.id}
                                className="border-t"
                                >
                                    <td className="p-4">
                                        {payment.booking?.customerName}
                                    </td>

                                    <td className="p-4">
                                        {
                                            payment.booking?.service?.name
                                        }
                                    </td>
                                    <td className="p-4">
                                        ${payment.amount}
                                    </td>

                                    <td
                                    className="p-4"
                                    >
                                        {payment.paymentType}
                                    </td>
                                    <td className="p-4">
                                        {payment.status}
                                    </td>
                                 <td className="p-4">
  {payment.createdAt
    ? new Date(payment.createdAt).toLocaleDateString()
    : "No Date"}
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

export default PaymentsManagement;