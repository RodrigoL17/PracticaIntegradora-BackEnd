import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "./utils/Dotenv/config.js";

import { dirname } from "path";
import { fileURLToPath } from "url";

//Absolute Path
export const __dirname = dirname(fileURLToPath(import.meta.url));

//hasheo de contraseña
export const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (password, passwordBD) => {
  return bcrypt.compare(password, passwordBD);
};

//Random string  ---->  Used in purchase Schema to generate random conde
export const generateRandomString = () => {
  const code = crypto.randomBytes(6).toString("hex");
  return code;
};

//JWT
export const generateToken = (user) => {
  const token = jwt.sign({ user }, config.JWT_SECRET, { expiresIn: "1h" }); // generate token expires in 1hs
  return token;
};
