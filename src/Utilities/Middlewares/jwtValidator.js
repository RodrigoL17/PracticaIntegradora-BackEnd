import jwt from "jsonwebtoken";
import config from "../Dotenv/config.js";

export const jwtValidation = (token) => {
  const verifiedUser = jwt.verify(token, config.JWT_SECRET);
  return verifiedUser ? verifiedUser.user : null;
};
