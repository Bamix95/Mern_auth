import crypto from "crypto";

export const generateOtp = (length = 4) => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let otp = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, chars.length);
    otp += chars[randomIndex];
  }

  return otp;
};
