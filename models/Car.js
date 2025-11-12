import mongoose from "mongoose";


const carSchema = new mongoose.Schema({
owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
brand: String,
model: String,
pricePerDay: Number,
location: String,
available: { type: Boolean, default: true }
});


export default mongoose.model("Car", carSchema);