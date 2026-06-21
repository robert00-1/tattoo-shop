import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import ReviewForm from "../components/ReviewForm";
import ReviewsList from "../components/ReviewsList";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    loadService();
    loadSlots();
  }, []);

  const loadService = async () => {
    try {
      const response = await api.get("/services");

      const foundService = response.data.find(
        (s) => s.id === id
      );

      setService(foundService);
    } catch (error) {
      console.error(error);
    }
  };

  const loadSlots = async () => {
    try {
      const response = await api.get(
        `/slots/service/${id}`
      );

      setSlots(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const groupedSlots = slots.reduce(
  (groups, slot) => {
    const date =
      new Date(slot.date).toLocaleDateString();

    if (!groups[date]) {
      groups[date] = [];
    }

    groups[date].push(slot);

    return groups;
  },
  {}
);

  if (!service) {
    return <h1 className="text-center mt-20">Loading...</h1>;
  }

  return (
    <>
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-6">

          <img
            src={
              service.media?.[0]?.url ||
              "https://via.placeholder.com/800"
            }
            alt={service.name}
            className="w-full h-[500px] object-cover rounded-xl"
          />

          <h1 className="text-5xl font-bold mt-8 mb-4">
            {service.name}
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            {service.description}
          </p>

          <div className="flex gap-8 mb-8">
            <span className="font-bold text-xl">
              ${service.price}
            </span>

            <span className="text-gray-500">
              {service.duration} mins
            </span>
          </div>
       
   



          <h2 className="text-2xl font-bold mb-4">
            Available Slots
          </h2>

          <div className="flex flex-wrap gap-3 mb-8">
         {Object.entries(groupedSlots).map(
  ([date, daySlots]) => (
    <div key={date}>
      <h3 className="font-bold text-xl mb-2">
        {date}
      </h3>

      <div className="flex flex-wrap gap-2">
        {daySlots.map(slot => (
          <button
            key={slot.id}
            disabled={slot.isBooked}
            onClick={() =>
              setSelectedSlot(slot)
            }
            className={`
              px-4 py-2 rounded-lg text-white
              ${
              slot.isBooked
              
                ? "bg-red-500 text-white px-4 py-2 rounded"
                : "bg-green-500 text-white px-4 py-2 rounded"
              }
            `}

          >
            {slot.startTime} - {slot.endTime}
            {slot.isBooked && " (Booked)"}
          </button>
        ))}
      </div>
    </div>
  )
)}
          </div>

          {selectedSlot && (
            <div className="mb-8 p-4 bg-gray-100 rounded">
              <h3 className="font-bold mb-2">
                Selected Slot
              </h3>

              <p>
                {new Date(
                  selectedSlot.date
                ).toLocaleDateString()}
                {" - "}
                {selectedSlot.startTime} -{""}
                {selectedSlot.endTime}

              </p>
            </div>
          )}

          <button
            disabled={!selectedSlot}
            onClick={() =>
              navigate(`/booking/${service.id}`, {
                state: {
                  service,
                  slot: selectedSlot,
                },
              })
            }
            className="
              bg-red-600
              text-white
              px-8
              py-4
              rounded-lg
              hover:bg-red-700
              disabled:bg-gray-400
            "
          >
            Continue Booking
          </button>
          <div className="mt-16 border-t pt-10">
  <h2 className="text-3xl font-bold mb-6">
    Customer Reviews
  </h2>

  <ReviewsList serviceId={service.id} />

  <div className="mt-8">
    <ReviewForm serviceId={service.id} />
  </div>
</div>
         
        </div>
      </section>

      <Footer />
    </>
  );
}

export default ServiceDetails;