import authRoutes from "./routes/authRoutes.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import eventRoutes from "./routes/eventRoutes.js";

dotenv.config();

const app = express();

// middleware
app.use(cors({
  origin: "*"
}));
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// test route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// connect DB
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};

startServer();