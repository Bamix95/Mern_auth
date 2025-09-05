import express from "express";
import {
  currentuser,
  logout,
  signin,
  signup,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/me", authMiddleware, currentuser);
router.post("/logout", logout);

export default router;
