import Car from "../models/Car.js";


export const createCar = async (req, res) => {
try {
const car = await Car.create({ ...req.body, owner: req.user._id });
res.status(201).json(car);
} catch (error) {
res.status(500).json({ message: error.message });
}
};


export const getCars = async (req, res) => {
  try {
    const { brand, fuelType, minPrice, maxPrice } = req.query;
    const filter = {};

    if (brand) filter.brand = { $regex: brand, $options: "i" };
    if (fuelType) filter.fuelType = fuelType;
    if (minPrice || maxPrice) {
      filter.pricePerDay = {};
      if (minPrice) filter.pricePerDay.$gte = Number(minPrice);
      if (maxPrice) filter.pricePerDay.$lte = Number(maxPrice);
    }

    const cars = await Car.find(filter);
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};