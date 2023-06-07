import { jwtValidation } from "./jwtValidator.js";

export const authAdmin = async (req, res, next) => {
  const { token } = req.cookies;
  const user = jwtValidation(token);
  console.log("admin", user);
  !user?.isAdmin && res.status(401).send("Unauthorized");
  req.user = user;
  next();
};

export const authPremium = async (req, res, next) => {
  const { token } = req.cookies;
  const user = jwtValidation(token);
  console.log("premium", user);
  !user?.isPremium && next();
  req.user = user;
  next();
};

export const authUser = async (req, res, next) => {
  console.log("user");
  const { token } = req.cookies;
  const user = jwtValidation(token);
  !user?.isUser && res.status(401).send("Unauthorized to perform this action");
  req.user = user;
  next();
};
