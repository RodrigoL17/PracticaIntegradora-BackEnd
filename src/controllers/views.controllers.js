import prodService from "../services/products.services.js";
import cartService from "../services/cart.services.js";
import userService from "../services/user.services.js";

const renderLogin = (req, res) => {
  const data = {
    logoPath: "images/logo.png",
  }
  res.render("Login/login", data);
};
const renderRegistration = (req, res) => {
  res.render("Registration/registerForm");
};

const renderProfile = (req, res) => {
  res.render("profile");
};

const renderErrorLogin = (req, res) => {
  res.render("Login/errorLogin");
};

const renderReestablish = (req, res) => {
  res.render("reestablish");
}

const getCart = async (req, res) => {
  const { cid } = req.params;
  const cart = await cartService.getById(cid);
  res.render("cart", { cart: cart.products });
};
const getProuctsEmailAssociated = async (req, res) => {
  const { limit = 40, page = 1, sort, ...query } = req.params;
  const { email, _id } = req.user;
  const user = await userService.getByEmail(email);
  const userCart = await cartService.getByUserId(_id);
  const products = await prodService.getAll(limit, page, sort, query);
  res.render("products", {
    products: products.docs,
    user: user,
    cartId: userCart._id,
  });
};

export default {getCart, getProuctsEmailAssociated, renderLogin, renderRegistration, renderProfile, renderErrorLogin, renderReestablish}