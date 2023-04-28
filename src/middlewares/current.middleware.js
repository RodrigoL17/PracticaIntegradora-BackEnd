export const authAdmin = async (req, res, next) => {
  const { email } = req.session;
  const user = await findUser(email);
  user.rol === "admin" ? next() : res.status(401).send("No autorizado");
};

export const authUser = async (req, res, next) => {
  const { email } = req.session;
  const user = await findUser(email);
  user.rol === "user" ? next() : res.status(401).send("No autorizado");
};
