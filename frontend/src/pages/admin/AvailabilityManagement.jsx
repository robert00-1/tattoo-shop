import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminSidebar from "../../components/admin/AdminSidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AvailabilityManagement() {
  const [services, setServices] = useState([]);
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [formData, setFormData] = useState({
    serviceId: "",
    startTime: "",
    endTime: "",
  });

  const fetchServices = async () => {
    try {
      const res = await api.get("/services");
      setServices(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchSlots = async (serviceId) => {
  try {
    const res = await api.get(
      `/slots/service/${serviceId}`
    );

    setSlots(res.data);
  } catch (err) {
    console.error(err);
  }
};

const deleteSlot = async (id) => {
  try {
    await api.delete(`/slots/${id}`);

    fetchSlots(formData.serviceId);
  } catch (err) {
    console.error(err);
  }
};

const toggleSlot = async (id) => {
  try {
    await api.patch(
      `/slots/toggle/${id}`
    );

    fetchSlots(formData.serviceId);
  } catch (err) {
    console.error(err);
  }
};
  useEffect(() => {
    fetchServices();
  }, []);

  const createAvailability = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "/slots/availability",{
        ...formData,
        date: selectedDate.toISOString(),

    });

      alert("Availability created");
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed"
      );
    }
  };

  const generateSlots = async () => {
    if (!formData.serviceId) {
      return alert("Select service");
    }

    try {
      await api.post(
        `/slots/generate/${formData.serviceId}`
      );

      alert("Slots generated");
      fetchSlots(formData.serviceId);
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed"
      );
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold mb-8">
          Availability Scheduler
        </h1>
<form
  onSubmit={createAvailability}
  className="bg-white p-6 rounded-xl shadow space-y-4"
>
  {/* SERVICE SELECT */}
  <select
    value={formData.serviceId}
    onChange={(e) => {
      const serviceId = e.target.value;

      setFormData({
        ...formData,
        serviceId,
      });

      if (serviceId) fetchSlots(serviceId);
    }}
    className="w-full border p-3 rounded"
  >
    <option value="">Select Service</option>

    {services.map((service) => (
      <option key={service.id} value={service.id}>
        {service.name}
      </option>
    ))}
  </select>

  {/* DATE PICKER (OUTSIDE SELECT) */}
  <div>
    <label>Select Date</label>
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      dateFormat="dd/MM/yyyy"
      minDate={new Date()}
      className="w-full border p-3 rounded"
    />
  </div>

  {/* TIME INPUTS */}
  <input
    type="time"
    value={formData.startTime}
    onChange={(e) =>
      setFormData({ ...formData, startTime: e.target.value })
    }
    className="w-full border p-3 rounded"
  />

  <input
    type="time"
    value={formData.endTime}
    onChange={(e) =>
      setFormData({ ...formData, endTime: e.target.value })
    }
    className="w-full border p-3 rounded"
  />

  <button
    type="submit"
    className="bg-blue-600 text-white px-6 py-3 rounded-lg"
  >
    Save Availability
  </button>
</form>

        <button
          onClick={generateSlots}
          className="
            mt-6
            bg-green-600
            text-white
            px-6
            py-3
            rounded-lg
          "
        >
          Generate Slots
        </button>
          <div className="mt-10">
  <h2 className="text-2xl font-bold mb-4">
    Generated Slots
  </h2>

  <div className="bg-white rounded-xl shadow">
    <table className="w-full">
      <thead className="bg-gray-100">
        <tr>
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
          <th className="p-4 text-left">Actions</th>
        </tr>
      </thead>

      <tbody>
        {slots.map((slot) => (
          <tr
            key={slot.id}
            className="border-t"
          >
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
                : slot.isActive 
                ? "Available"
                : "Disabled"
            }
            </td>
            <td className="p-4">
  <div className="flex gap-2">

    <button
      onClick={() => deleteSlot(slot.id)}
      className="
        bg-red-600
        text-white
        px-3
        py-2
        rounded
      "
    >
      Delete
    </button>

    <button
      onClick={() => toggleSlot(slot.id)}
      className="
        bg-yellow-500
        text-white
        px-3
        py-2
        rounded
      "
    >
      Disable
    </button>

  </div>
</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
      </div>
    </div>
  );
}

export default AvailabilityManagement;   
