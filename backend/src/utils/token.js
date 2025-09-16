import jwt from "jsonwebtoken";
import config from "../config/env.config.js";

export const signToken = (id) => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
};
