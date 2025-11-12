import express from "express";
import { protect, adminOnly } from "../middleware/auth.js";
import { createRental, getUserRentals, markAsPaid } from "../controllers/rental.controller.js";

const router = express.Router();

router.post("/", protect, createRental);
router.get("/my", protect, getUserRentals);
router.put("/:id/pay", protect, adminOnly, markAsPaid);

export default router;
