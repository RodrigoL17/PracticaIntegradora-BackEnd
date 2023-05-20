import prodService from "../services/products.services.js";
import cartService from "../services/cart.services.js";
import userService from "../services/user.services.js";

const renderLogin = (req, res) => {
  res.render("login");
};
const renderRegistration = (req, res) => {
  res.render("registration");
};

const renderProfile = (req, res) => {
  res.render("profile");
};

const renderErrorLogin = (req, res) => {
  res.render("errorLogin");
};

const renderReestablecer = (req, res) => {
  res.render("reestablecer");
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

export default {getCart, getProuctsEmailAssociated, renderLogin, renderRegistration, renderProfile, renderErrorLogin, renderReestablecer}