import express from "express";

import {
    create,
    getAll,
    getOne,
    update,
    remove,
} from "./wallet.controller.js";


import { authMiddleware} from "../../middleware/authMiddleware.js";
import {authorize} from "../../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/active", getOne);

router.get(
    "/",
    authMiddleware,
    authorize("ADMIN"),
    getAll
);
router.post(
    "/",
    authMiddleware,
    authorize("ADMIN"),
    create
);

router.put(
    "/:id",
    authorize("ADMIN"),
    update
);

router.delete(
    "/:id",
    authMiddleware,
    authorize("ADMIN"),
    remove
);
export default router;