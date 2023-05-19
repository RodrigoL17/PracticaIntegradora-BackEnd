import { createUser, userLogIn } from "../services/user.services.js";
import cartService from "../services/cart.services.js";
import { generateToken } from "../utils.js";

export const renderLogin = (req, res) => {
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
  await cartService.create(newUser._id);
  if (newUser) {
    res.redirect("/");
  } else {
    res.send("error registro");
  }
};

export const login = async (req, res) => {
  try {
    const user = await userLogIn(req.body);
    if (user) {
      const token = generateToken(user);
     
      res
        .cookie("token", token, { httpOnly:true })
        .redirect("/views/products");
    } else {
      res.redirect("/api/session/errorLogin");
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
