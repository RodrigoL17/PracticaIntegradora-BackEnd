import prodService from "../services/products.services.js";
import cartService from "../services/cart.services.js";
import { findUser } from "../services/user.services.js";


export const getCart = async (req, res) => {
  const { cid } = req.params;
  const cart = await cartService.getById(cid);
  res.render("cart", { cart: cart.products });
};

export const getProuctsEmailAssociated = async (req, res) => {
  const { limit = 40, page = 1, sort, ...query } = req.params;
  const { email, _id } = req.user;
  const user = await findUser(email);
  const userCart = await cartService.getByUserId(_id)
  const products = await prodService.getAll(limit, page, sort, query);
  res.render("products", { products: products.docs, user:user, cartId: userCart._id });
};
