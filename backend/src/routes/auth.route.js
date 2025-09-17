import express from "express";
import {
  loginUser,
  registerUser,
  resendOtp,
  verifyAccount,
} from "../controllers/auth.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify", isAuthenticated, verifyAccount);
router.post("/resend", isAuthenticated, resendOtp);
router.post("/login", loginUser);

export default router;
