import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { AppError } from "../utils/appError.js";
import { generateOtp } from "../utils/generateOtp.js";
import sendEmail from "../utils/email.js";
import createSendToken from "../utils/createSendToken.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    throw new AppError("User Exist Already", 400);
  }

  const otp = generateOtp(4);

  const otpExpires = Date.now() + 60 * 60 * 1000;

  const newUser = await User.create({
    username,
    email,
    password,
    otp,
    otpExpires,
  });

  try {
    await sendEmail({
      email: newUser.email,
      subject: "OTP for email verification",
      html: `<h1>Your OTP is : ${otp}</h1>`,
    });

    createSendToken(
      newUser,
      201,
      res,
      "Registration successful, please verify your email"
    );
  } catch (error) {
    await User.findByIdAndDelete(newUser._id);
    throw new AppError("Error occurred creating user, try again later", 500);
  }
});

export { registerUser };
