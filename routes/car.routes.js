import express from "express";
import { getCars, createCar } from "../controllers/car.controller.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getCars);               // public
router.post("/", protect, adminOnly, createCar); // only admins

export default router;
