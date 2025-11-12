import express from "express";
import { body } from "express-validator";
import { createBooking, getUserBookings } from "../controllers/booking.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/",
  protect,
  [
    body("carId").notEmpty(),
    body("startDate").notEmpty(),
    body("endDate").notEmpty()
  ],
  createBooking
);

router.get("/my-bookings", protect, getUserBookings);

export default router;
