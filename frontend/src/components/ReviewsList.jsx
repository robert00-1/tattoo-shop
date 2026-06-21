import { useEffect, useState } from "react";
import api from "../services/api";

function ReviewsList({ serviceId }) {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const res = await api.get(
        `/reviews/service/${serviceId}`
      );

      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (serviceId) {
      fetchReviews();
    }
  }, [serviceId]);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Customer Reviews
      </h2>

      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white p-4 rounded-xl shadow mb-4"
        >
          <div className="font-bold">
            {review.rating} ⭐
          </div>
          <h4 className="text-sm text-gray-500">
            {review.name}
          </h4>
          <p className="mt-2">
            {review.comment}
          </p>

          <p className="text-sm text-gray-500 mt-2">
            {new Date(
              review.createdAt
            ).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ReviewsList;