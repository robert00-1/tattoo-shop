import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const images = [
  "/images/tattoo1.jpg",
  "/images/tattoo2.jpg",
  "/images/tattoo3.jpg",
  "/images/tattoo4.jpg",
];

function Hero() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000); // change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen relative flex items-center justify-center text-white overflow-hidden">

      {/* SLIDES */}
      {images.map((img, i) => (
        <div
          key={i}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${img})`,
            opacity: i === index ? 1 : 0,
          }}
        />
      ))}

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* CONTENT */}
      <div className="relative text-center px-6 max-w-4xl">
        <h1 className="text-6xl font-bold mb-6">
          Professional Tattoo & Massage Studio
        </h1>

        <p className="text-xl text-gray-300 mb-8">
          Premium tattoo artistry, relaxing massage treatments, and exceptional customer care.
        </p>

        <button
          onClick={() => navigate("/services")}
          className="bg-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-red-700"
        >
          Explore Services
        </button>
      </div>

    </section>
  );
}

export default Hero;