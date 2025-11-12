// src/controllers/booking.controller.js
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";
import { validationResult } from "express-validator";

const msPerDay = 1000 * 60 * 60 * 24;
const ceilDays = (s,e) => Math.max(1, Math.ceil((e - s) / msPerDay));


const rangesOverlap = (a1,a2,b1,b2) => !(a2 < b1 || b2 < a1);

export const createBooking = async (req, res) => {
  try {
    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { carId, startDate, endDate } = req.body;
    if (!carId || !startDate || !endDate) return res.status(400).json({ message: "Missing fields" });

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start) || isNaN(end) || end < start) return res.status(400).json({ message: "Invalid dates" });

    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ message: "Car not found" });

    // Find existing bookings that overlap the requested interval
    const overlapping = await Booking.findOne({
      car: carId,
      status: { $in: ["pending", "confirmed"] },
      $or: [
        {
          startDate: { $lte: end },
          endDate: { $gte: start }
        }
      ]
    });

    if (overlapping) return res.status(409).json({ message: "Car already booked for those dates" });

    const days = ceilDays(start, end);
    const totalPrice = days * car.pricePerDay;

    const booking = await Booking.create({
      car: carId,
      user: req.user._id,
      startDate: start,
      endDate: end,
      totalPrice,
      status: "pending"
    });

    return res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



export const getUserBookings = async (req, res) => {
const bookings = await Booking.find({ user: req.user._id }).populate("car");
res.json(bookings);
};