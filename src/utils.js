import bcrypt from "bcrypt";
import crypto from "crypto";

//dirnname

import { dirname } from "path";
import { fileURLToPath } from "url";

export const __dirname = dirname(fileURLToPath(import.meta.url));

//hasheo de contraseña

export const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (password, passwordBD) => {
  return bcrypt.compare(password, passwordBD);
};

//generar string Random

export const generateRandomString = () => {
    const code = crypto.randomBytes(6).toString("hex")
    return code
}



