import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import { AppError } from "../utils/appError.js";
import config from "../config/env.config.js";

const isAuthenticated = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new AppError("You are not logged in, please login to access", 401);
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    throw new AppError("Invalid or expired token, please login again", 401);
  }
});

export default isAuthenticated;
