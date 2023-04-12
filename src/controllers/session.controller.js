import { createUser, userLogIn } from "../services/user.services.js";

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

export const logout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.log(error);
      res.json({ message: error });
    }
  });
  res.redirect("/");
};
