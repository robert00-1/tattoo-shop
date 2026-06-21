
import { useNavigate } from "react-router-dom";
function ServiceCard({ service }) {
    const navigate = useNavigate();
  return (
    <div
      className="
        bg-white
        rounded-xl
        overflow-hidden
        shadow-lg
        hover:shadow-2xl
        transition
      "
    >
    <img
  src={
    service.media?.[0]?.url ||
    "https://via.placeholder.com/400"
  }
  alt={service.name}
  className="w-full h-60 object-cover"
/>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-3">
          {service.name}
        </h3>

        <p className="text-gray-600 mb-4">
          {service.description}
        </p>

        <div className="flex justify-between mb-4">
          <span className="font-semibold">
            ${service.price}
          </span>

          <span className="text-gray-500">
            {service.duration} mins
          </span>
        </div>
       <button
  onClick={() =>
    navigate(`/services/${service.id}`)
  }
  className="
    w-full
    bg-black
    text-white
    py-3
    rounded-lg
    hover:bg-gray-800
  "
>
  View Details
</button>
      </div>
    </div>
  );
}

export default ServiceCard;