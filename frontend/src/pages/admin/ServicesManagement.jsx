import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminSidebar from "../../components/admin/AdminSidebar";

function ServicesManagement() {
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "TATTOO",
    price: "",
    duration: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchServices = async () => {
    try {
      const res = await api.get("/services");
      setServices(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const createService = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/services/${editingId}`, {
          ...formData,
          price: Number(formData.price),
          duration: Number(formData.duration),
        });

        alert("Service updated successfully");
      } else {
        await api.post("/services", {
          ...formData,
          price: Number(formData.price),
          duration: Number(formData.duration),
        });

        alert("Service created successfully");
      }

      fetchServices();

      setShowForm(false);
      setEditingId(null);

      setFormData({
        name: "",
        description: "",
        category: "TATTOO",
        price: "",
        duration: "",
      });

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Operation failed"
      );
    }
  };

  const deleteService = async (id) => {
    try {
      if (!window.confirm("Delete service?")) {
        return;
      }

      await api.delete(`/services/${id}`);

      alert("Service deleted");

      fetchServices();
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-10">

        <div className="flex justify-between mb-8">
          <h1 className="text-5xl font-bold">
            Services
          </h1>

          <button
            onClick={() => {
              setEditingId(null);

              setFormData({
                name: "",
                description: "",
                category: "TATTOO",
                price: "",
                duration: "",
              });

              setShowForm(true);
            }}
            className="
              bg-red-600
              text-white
              px-6
              py-3
              rounded-lg
            "
          >
            Add Service
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={createService}
            className="
              bg-white
              p-6
              rounded-xl
              shadow
              mb-8
              space-y-4
            "
          >
            <input
              type="text"
              name="name"
              placeholder="Service Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            >
              <option value="TATTOO">
                Tattoo
              </option>

              <option value="MASSAGE">
                Massage
              </option>
            </select>

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <input
              type="number"
              name="duration"
              placeholder="Duration (mins)"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <button
              type="submit"
              className="
                bg-green-600
                text-white
                px-6
                py-3
                rounded-lg
              "
            >
              {editingId
                ? "Update Service"
                : "Save Service"}
            </button>
          </form>
        )}

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-6 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Category
                </th>

                <th className="p-4 text-left">
                  Price
                </th>

                <th className="p-4 text-left">
                  Duration
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {services.map((service) => (
                <tr
                  key={service.id}
                  className="border-t"
                >
                  <td className="p-4">
                    {service.name}
                  </td>

                  <td className="p-4">
                    {service.category}
                  </td>

                  <td className="p-4">
                    ${service.price}
                  </td>

                  <td className="p-4">
                    {service.duration} mins
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">

                      <button
                        onClick={() => {
                          setEditingId(service.id);

                          setFormData({
                            name: service.name,
                            description:
                              service.description,
                            category:
                              service.category,
                            price: service.price,
                            duration:
                              service.duration,
                          });

                          setShowForm(true);
                        }}
                        className="
                          bg-blue-600
                          text-white
                          px-4
                          py-2
                          rounded-lg
                        "
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteService(service.id)
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

export default ServicesManagement;