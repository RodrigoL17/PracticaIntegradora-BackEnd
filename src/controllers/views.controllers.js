import prodService from "../services/products.services.js";
import cartService from "../services/cart.services.js";
import userService from "../services/user.services.js";

const renderLogin = (req, res) => {
  const data = {
    logoPath: "images/logo.png",
  };
  res.render("Login/login", data);
};
const renderRegistration = (req, res) => {
  res.render("Registration/registerForm");
};

const renderProfile = (req, res) => {
  res.render("Profile/profile");
};

const renderErrorLogin = (req, res) => {
  res.render("Login/errorLogin");
};

const renderResetPassword = (req, res) => {
  res.render("ResetPassword/resetPassword");
};

const renderCart = async (req, res) => {
  const { cid } = req.params;
  const cart = await cartService.getById(cid);
  res.render("Cart/cart", {cartId: cart._id, user: cart.userId, products: cart.products });
};
const renderProductsEmailAssociated = async (req, res) => {
  const { limit = 12, page = 1, sort, ...query } = req.query;
  const { email, _id } = req.user;
  const user = await userService.getByEmail(email);
  const userCart = await cartService.getByUserId(_id);
  const cartId = userCart._id.toString();
  const products = await prodService.getAll(limit, page, sort, query);
  const { docs, ...rest } = products;
  const pagination = {
    ...rest,
    prevLink: rest.prevPage
      ? `http://localhost:3000/products?page=${rest.prevPage}`
      : null,
    nextLink: rest.nextPage
      ? `http://localhost:3000/products?page=${rest.nextPage}`
      : null,
  };
  res.render("Products/products", {
    products: products.docs,
    user: user,
    cartId: cartId,
    pagination: pagination,
  });
};

const renderChangePassword = (req, res) => {
  const { uid, token } = req.params;
  const { isWrong } = req.query
  const prevToken = req.cookies.token;
  if (token === prevToken) {
    res.render("ResetPassword/changePassword", { uid: uid, token: token, isWrong: isWrong });
  } else {
    res.render("ResetPassword/tokenExpired");
  }
};

const renderCardProduct = async (req, res) => {
  const {pid, uid} = req.params;
  const user = await userService.getById(uid);
  const product = await prodService.getById(pid);
  const {_id} = user
  const cart = await cartService.getByUserId(_id) 
  res.render("Products/card", {product: product, user: user, cartId: cart._id})
}

export default {
  renderCart,
  renderProductsEmailAssociated,
  renderLogin,
  renderRegistration,
  renderProfile,
  renderErrorLogin,
  renderResetPassword,
  renderChangePassword,
  renderCardProduct,
};
