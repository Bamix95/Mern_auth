import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { AppError } from "../utils/appError.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    throw new AppError("User Exist Already", 401);
  }
});
