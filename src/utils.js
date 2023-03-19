import bcrypt from "bcrypt";

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
