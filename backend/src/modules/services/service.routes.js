import express from "express";
import {
  create,
  getAll,
  getOne,
  update,
  remove,

} from "./service.controller.js";

import { authMiddleware } from "../../middleware/authMiddleware.js";
import { authorize } from "../../middleware/roleMiddleware.js";

const router = express.Router();

// 🔐 ADMIN ONLY (CREATE SERVICE)
router.post(
  "/",
  authMiddleware,
  authorize("ADMIN"),
  create
);
router.put(
  "/:id",
  authMiddleware,
  authorize("ADMIN"),
  update
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("ADMIN"),
  remove
);
// 🌍 PUBLIC (READ)
router.get("/", getAll);
router.get("/:id", getOne);

export default router;