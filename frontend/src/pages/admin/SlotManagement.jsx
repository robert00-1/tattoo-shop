import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminSidebar from "../../components/admin/AdminSidebar";

function SlotManagement() {
  const [slots, setSlots] = useState([]);

  const fetchSlots = async () => {
    try {
      const res = await api.get("/slots");
      setSlots(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const deleteSlot = async (id) => {
    try {
      if (!window.confirm("Delete slot?")) {
        return;
      }

      await api.delete(`/slots/${id}`);

      alert("Slot deleted");

      fetchSlots();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold mb-8">
          Slot Management
        </h1>

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">
                  Service
                </th>

                <th className="p-4 text-left">
                  Date
                </th>

                <th className="p-4 text-left">
                  Start
                </th>

                <th className="p-4 text-left">
                  End
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {slots.map((slot) => (
                <tr
                  key={slot.id}
                  className="border-t"
                >
                  <td className="p-4">
                    {slot.service?.name}
                  </td>

                  <td className="p-4">
                    {new Date(
                      slot.date
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    {slot.startTime}
                  </td>

                  <td className="p-4">
                    {slot.endTime}
                  </td>

                  <td className="p-4">
                    {slot.isBooked
                      ? "Booked"
                      : "Available"}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() =>
                        deleteSlot(slot.id)
                      }
                      className="
                        bg-red-600
                        text-white
                        px-4
                        py-2
                        rounded-lg
                      "
                    >
                      Delete
                    </button>
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

export default SlotManagement;