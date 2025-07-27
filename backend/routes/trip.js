import express from "express";
import { createTrip, searchTrips, joinTrip } from "../controllers/tripControllers.js";
import isAuthenticated from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", isAuthenticated, createTrip);
router.get("/search", searchTrips);
router.post("/join/:tripId", isAuthenticated, joinTrip);

export default router;
