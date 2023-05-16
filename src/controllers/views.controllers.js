import { getAllProds } from "../services/products.services.js";
import { getCartByIdService, findCartByUserIdService } from "../services/cart.services.js";
import { findUser } from "../services/user.services.js";

export const renderRealTimeProdcuts = (req, res) => {
  res.render("realtimeproducts");
};

export const getAllProductsViews = async (req, res) => {
  const { limit = 10, page = 1, sort, ...query } = req.params;
  const products = await getAllProds(limit, page, sort, query);
  res.render("home", { products: products.docs });
};

export const getCart = async (req, res) => {
  const { cid } = req.params;
  const cart = await getCartByIdService(cid);
  res.render("cart", { cart: cart.products });
};

export const getProuctsEmailAssociated = async (req, res) => {
  const { limit = 10, page = 1, sort, ...query } = req.params;
  const {email} = req.session 
  const user = await findUser(email);
  const userCart = await findCartByUserIdService(user._id)
  console.log("la", userCart)
  const products = await getAllProds(limit, page, sort, query);
  res.render("products", { products: products.docs, user:user, cartId: userCart._id });
};
