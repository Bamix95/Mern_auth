import config from "../config/env.config.js";
import { signToken } from "./token.js";

const createSendToken = (user, statusCode, res, message) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + config.cookieExpiresIn * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: config.nodeEnv === "production" ? "none" : "lax",
  };

  res.cookie("token", token, cookieOptions);

  res.status(statusCode).json({
    success: true,
    message: message,
    user,
  });
};

export default createSendToken;
