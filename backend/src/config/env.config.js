import { getEnv } from "../utils/getEnv.js";

export const config = {
  port: getEnv("PORT", 5000),
  mongoUri: getEnv("MONGO_URI"),
  jwtSecret: getEnv("JWT_SECRET"),
  jwtExpiresIn: getEnv("JWT_EXPIRES_IN", "1d"),
  cookieExpiresIn: Number(getEnv("COOKIE_EXPIRES_IN", 1)),
  nodeEnv: getEnv("NODE_ENV", "development"),
  frontendUrl: getEnv("FRONTEND_URL", "http://localhost:3000"),
  emailUser: getEnv("EMAIL_USER"),
  emailPass: getEnv("EMAIL_PASS"),
};

export default config;
