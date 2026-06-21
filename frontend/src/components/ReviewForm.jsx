import { useState } from "react";
import api from "../services/api";

function ReviewForm({ serviceId, onSuccess }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [name, setName] = useState("");

  const submitReview = async (e) => {
    e.preventDefault();

    try {
      await api.post("/reviews", {
        serviceId,
        name,
        customerName,
        rating,
        comment,
      });

      alert("Review submitted");

      setComment("");
      setRating(5);

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
        console.log(err.response?.data);
      console.error(err);
      

      alert(
        err.response?.data?.message ||
          "Failed to submit review"
      );
    }
  };

  return (
    <form
      onSubmit={submitReview}
      className="bg-white p-6 rounded-xl shadow"
    >
      <h3 className="text-xl font-bold mb-4">
        Leave Review
      </h3>

      <input
  type="text"
  placeholder="Your name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="w-full border p-3 rounded mb-4"
/>

      <select
        value={rating}
        onChange={(e) =>
          setRating(Number(e.target.value))
        }
        className="w-full border p-3 rounded mb-4"
      >
        <option value={5}>⭐⭐⭐⭐⭐</option>
        <option value={4}>⭐⭐⭐⭐</option>
        <option value={3}>⭐⭐⭐</option>
        <option value={2}>⭐⭐</option>
        <option value={1}>⭐</option>
      </select>

      <textarea
        value={comment}
        onChange={(e) =>
          setComment(e.target.value)
        }
        placeholder="Write your review..."
        className="w-full border p-3 rounded mb-4"
        rows={4}
      />

        <input
  type="text"
  placeholder="Your Name"
  value={customerName}
  onChange={(e) =>
    setCustomerName(e.target.value)
  }
/>
      <button
        type="submit"
        className="bg-black text-white px-6 py-3 rounded"
      >
        Submit Review
      </button>
    </form>
  );
}

export default ReviewForm;