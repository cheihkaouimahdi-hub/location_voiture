import mongoose from "mongoose";


const bookingSchema = new mongoose.Schema({
car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
startDate: Date,
endDate: Date,
totalPrice: Number,
status: { type: String, enum: ["pending", "confirmed", "completed"], default: "pending" }
});


export default mongoose.model("Booking", bookingSchema);