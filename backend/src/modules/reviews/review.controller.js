import {
  createReview,
  getServiceReviews,
} from "./review.service.js";

export const addReview = async (
  req,
  res
) => {
  try {
    const review = await createReview(
      req.body.serviceId,
      req.body.name,
      req.body.rating,
      req.body.comment
    );

    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

export const getReviews = async (
  req,
  res
) => {
  try {
    const reviews = await getServiceReviews(
      req.params.serviceId
    );

    res.json(reviews);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};