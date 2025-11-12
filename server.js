import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import carRoutes from "./routes/car.routes.js";
import rentalRoutes from "./routes/rental.routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

dotenv.config();
await connectDB();

const app = express();



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/rentals", rentalRoutes);

app.get('/',(req,res)=>{
  res.send("mhaaaaaa lcooood");
});

// Swagger setup
const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Car Rental API", version: "1.0.0" },
    servers: [
      {
        url: "http://localhost:50001",
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/*.js", "./controllers/*.js"], // adjust if needed
};

const swaggerSpec = swaggerJsdoc(options);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 50001;
app.listen(PORT, () => console.log(`🚀 Server running on port http://localhost:${PORT}`));
