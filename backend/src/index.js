import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import config from "./config/env.config.js";
import { AppError } from "./utils/appError.js";
import asyncHandler from "./utils/asyncHandler.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: config.frontendUrl,
    credentials: true,
  })
);
app.use(helmet());

if (config.nodeEnv === "development") {
  app.use(morgan("dev"));
}

app.get(
  "/health",
  asyncHandler(async (req, res) => {
    if (!config.mongoUri) {
      throw new AppError("Database not configured", 500);
    }
    res.status(200).json({ status: "OK", message: "Server is running" });
  })
);

app.get(
  "/error-test",
  asyncHandler(async () => {
    throw new AppError("This is a test error", 400);
  })
);

app.use((req, res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(config.nodeEnv === "development" && { stack: err.stack }),
  });
});

mongoose
  .connect(config.mongoUri)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(config.port, () =>
      console.log(`Server running on port ${config.port}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });
