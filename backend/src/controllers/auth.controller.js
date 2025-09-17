import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { AppError } from "../utils/appError.js";
import { generateOtp } from "../utils/generateOtp.js";
import sendEmail from "../utils/email.js";
import createSendToken from "../utils/createSendToken.js";
import config from "../config/env.config.js";

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

const verifyAccount = asyncHandler(async (req, res, next) => {
  const { otp } = req.body;
  const userId = req.user.id;

  if (!otp) {
    throw new AppError("No Otp provided", 400);
  }

  const currentUser = await User.findById(userId);

  if (!currentUser) {
    throw new AppError("Unauthenticated, please login", 401);
  }

  if (currentUser.otp !== otp) {
    throw new AppError("Invalid OTP", 400);
  }

  if (Date.now() > currentUser.otpExpires) {
    throw new AppError("OTP has expired. Please request a new one", 400);
  }

  currentUser.isVerified = true;
  currentUser.otp = null;
  currentUser.otpExpires = null;

  await currentUser.save({ validateBeforeSave: false });

  createSendToken(currentUser, 200, res, "Email verified successfully");
});

const resendOtp = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const currentUser = await User.findById(userId);

  if (!currentUser) {
    throw new AppError("User not found", 404);
  }

  if (currentUser.isVerified) {
    throw new AppError("Account already verified", 400);
  }

  const newOtp = generateOtp(4);

  currentUser.otp = newOtp;
  currentUser.otpExpires = Date.now() + 10 * 60 * 1000;

  await currentUser.save({ validateBeforeSave: false });

  try {
    await sendEmail({
      email: currentUser.email,
      subject: "Resend OTP for email verification",
      html: `
        <h2>Email Verification OTP</h2>
        <p>Your OTP is: <strong>${newOtp}</strong></p>
        <p>This code will expire in 10 minutes. Please do not share it with anyone.</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "OTP sent successfully, check your email",
    });
  } catch (error) {
    currentUser.otp = undefined;
    currentUser.otpExpires = undefined;
    await currentUser.save({ validateBeforeSave: false });

    throw new AppError(
      "Error occurred while sending OTP. Please try again later",
      500
    );
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("All fields are required", 400);
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new AppError("User does not exist", 404);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  createSendToken(user, 200, res, "Login successful");
});

const logOut = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: config.nodeEnv === "development" ? "lax" : "strict",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new AppError("Please provide your email", 400);
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("User does not exist", 404);
  }

  const newOtp = generateOtp(4);
  const newOtpExpires = Date.now() + 15 * 60 * 1000;

  user.resetPasswordOtp = newOtp;
  user.resetPasswordOtpExpires = newOtpExpires;

  await user.save({ validateBeforeSave: false });

  try {
    await sendEmail({
      email: user.email,
      subject: "Reset Password OTP verification",
      html: `
        <h2>Reset Password OTP</h2>
        <p>Your OTP is: <strong>${newOtp}</strong></p>
        <p>This code will expire in 15 minutes. Please do not share it with anyone.</p>
      `,
    });

    res.status(200).json({
      success: true,
      message:
        "Password reset otp sent to your email, please check and proceed to the next step",
    });
  } catch (error) {
    user.resetPasswordOtp = undefined;
    user.resetPasswordOtpExpires = undefined;
    await user.save({ validateBeforeSave: false });

    throw new AppError(
      "Error occurred sending otp, please try again later",
      500
    );
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { email, otp, password } = req.body;

  if (!email || !otp || !password) {
    throw new AppError("Please provide all fields", 400);
  }

  const user = await User.findOne({
    email,
    resetPasswordOtp: otp,
    resetPasswordOtpExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  user.password = password;
  user.resetPasswordOtp = undefined;
  user.resetPasswordOtpExpires = undefined;

  await user.save();

  createSendToken(user, 200, res, "Password reset successfully");
});

export {
  registerUser,
  verifyAccount,
  resendOtp,
  loginUser,
  logOut,
  forgetPassword,
  resetPassword,
};
