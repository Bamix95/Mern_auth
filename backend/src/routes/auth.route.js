import express from "express";
import {
  forgetPassword,
  loginUser,
  logOut,
  registerUser,
  resendOtp,
  resetPassword,
  verifyAccount,
} from "../controllers/auth.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify", isAuthenticated, verifyAccount);
router.post("/resend", isAuthenticated, resendOtp);
router.post("/login", loginUser);
router.post("/logout", logOut);
router.post("/forgot-password", forgetPassword);
router.post("/reset-password", resetPassword);

export default router;
