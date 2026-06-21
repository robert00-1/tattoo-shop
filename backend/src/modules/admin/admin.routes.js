import express from "express";
import { generateSlots } from "./admin.controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { authorize } from "../../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/slots/generate-week",authMiddleware, authorize("ADMIN"), generateSlots);

export default router;