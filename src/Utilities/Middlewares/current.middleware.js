import userService from "../../services/user.services.js"

//falta cambiar como identificar, ya que cambio el schema ambas auth
export const authAdmin = async (req, res, next) => {
  const { email } = req.session;
  const user = await userService.getByEmail(email);
  user.rol === "admin" ? next() : res.status(401).send("No autorizado");
};

export const authUser = async (req, res, next) => {
  const { email } = req.session;
  const user = await userService.getByEmail(email);
  user.rol === "user" ? next() : res.status(401).send("No autorizado");
};
