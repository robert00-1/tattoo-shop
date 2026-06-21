import express from "express";

import {
  addReview,
  getReviews,
} from "./review.controller.js";

const router = express.Router();

router.post("/", addReview);

router.get(
  "/service/:serviceId",
  getReviews
);

export default router;