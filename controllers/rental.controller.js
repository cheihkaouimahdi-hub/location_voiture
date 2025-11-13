import Rental from "../models/Rental.js";
import Car from "../models/Car.js";

// Create a new rental
export const createRental = async (req, res) => {
  try {
    const { carId, startDate, endDate } = req.body;
    const userId = req.user._id;
    

    if (!carId || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields are eqruired" });
    }

    const car = await Car.findById(carId);
    if (!car) return res.status(404).json({ message: "Car not found" });

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      return res.status(400).json({ message: "Invalid date range" });
    }

    // 🧠 Check for overlapping rentals
    const overlap = await Rental.findOne({
      car: carId,
      $or: [{ startDate: { $lt: end }, endDate: { $gt: start } }],
    });

    if (overlap) {
      return res.status(400).json({ message: "Car already booked in this period" });
    }

    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalPrice = days * car.pricePerDay;

    const rental = await Rental.create({
      user: userId,
      car: carId,
      startDate: start,
      endDate: end,
      totalPrice,
      paymentStatus: "pending",
    });

    res.status(201).json(rental);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all rentals for a specific user
export const getUserRentals = async (req, res) => {
  const rentals = await Rental.find({ user: req.user._id }).populate("car");
  res.json(rentals);
};

// Mark a rental as paid (Cash on Delivery)
export const markAsPaid = async (req, res) => {
  try {
    const { id } = req.params;

    // تحقق من صحة الـ ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid rental ID" });
    }
    const rental = await Rental.findById(req.params.id);
    if (!rental) {
      return res.status(404).json({ message: "Rental not found" });
    }

    rental.paymentStatus = "paid";
    await rental.save();

    res.json({ message: "Payment marked as paid", rental });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

