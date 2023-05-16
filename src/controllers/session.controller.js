import { createUser, userLogIn } from "../services/user.services.js";
import { createCartService } from "../services/cart.services.js";

export const renderLogin = (req, res) => {
  console.log(req.session)
  res.render("login");
};

export const renderRegistration = (req, res) => {
  res.render("registration");
};

export const renderProfile = (req, res) => {
  res.render("profile");
};

export const renderErrorLogin = (req, res) => {
  res.render("errorLogin");
};

export const registration = async (req, res) => {
  const newUser = await createUser(req.body);
  await createCartService(newUser._id)
  if (newUser) {
    res.redirect("/");
  } else {
    res.send("error registro");
  } 
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userLogIn(req.body);
  if (user) {
    req.session.email = email;
    req.session.password = password;
    res.redirect("/views/products");
  } else {
    res.redirect("/api/session/errorLogin");
  }
};

export const logout = async (req, res) => {
  try {
    await req.session.destroy();
    await res.clearCookie('connect.sid');
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
};

