import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminSidebar from "../../components/admin/AdminSidebar";

function MediaManagement() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [file, setFile] = useState(null);

  const fetchServices = async () => {
    try {
      const res = await api.get("/services");
      setServices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const uploadFile = async (e) => {
    e.preventDefault();

    if (!selectedService || !file) {
      return alert("Select service and file");
    }

    try {
      const formData = new FormData();

      formData.append("file", file);

      await api.post(
        `/media/${selectedService}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Media uploaded successfully");

      setFile(null);
      setSelectedService("");

      fetchServices();
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Upload failed"
      );
    }
  };

  const deleteMedia = async (mediaId) => {
    try {
      if (!window.confirm("Delete this media?")) {
        return;
      }

      await api.delete(`/media/${mediaId}`);

      alert("Media deleted successfully");

      fetchServices();
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to delete media"
      );
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-10">
        <h1 className="text-4xl font-bold mb-8">
          Media Management
        </h1>

        {/* Upload Form */}

        <form
          onSubmit={uploadFile}
          className="bg-white p-6 rounded-xl shadow mb-10"
        >
          <select
            value={selectedService}
            onChange={(e) =>
              setSelectedService(e.target.value)
            }
            className="w-full border p-3 rounded-lg mb-4"
          >
            <option value="">
              Select Service
            </option>

            {services.map((service) => (
              <option
                key={service.id}
                value={service.id}
              >
                {service.name}
              </option>
            ))}
          </select>

          <input
            type="file"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
            className="mb-4"
          />

          <button
            type="submit"
            className="
              bg-red-600
              text-white
              px-6
              py-3
              rounded-lg
            "
          >
            Upload Media
          </button>
        </form>

        {/* Media List */}

        {services.map((service) => (
          <div
            key={service.id}
            className="mb-10"
          >
            <h2 className="text-2xl font-bold mb-4">
              {service.name}
            </h2>

            <div className="grid grid-cols-4 gap-4">
              {service.media?.map((media) => (
  <div
    key={media.id}
    className="border rounded-lg overflow-hidden bg-white"
  >

    {media.isCover && (
      <div className="bg-yellow-400 text-center py-2 font-bold">
        COVER IMAGE ⭐
      </div>
    )}
                  {media.type === "IMAGE" ? (
                    <img
                      src={media.url}
                      alt=""
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <video
                      src={media.url}
                      controls
                      className="w-full h-48"
                    />
                  )}

                  <button
                    onClick={() =>
                      deleteMedia(media.id)
                    }
                    className="
                      bg-red-600
                      text-white
                      py-2
                      w-full
                      hover:bg-red-700
                    "
                  >
                    Delete
                  </button>

                  <button
  onClick={async () => {
    try {
      await api.patch(
        `/media/cover/${media.id}`
      );

      alert("Cover image updated");

      fetchServices();
    } catch (err) {
      console.error(err);
    }
  }}
  className="
    bg-green-600
    text-white
    py-2
    w-full
  "
>
  Set Cover ⭐
</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MediaManagement;