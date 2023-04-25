import { cartDao } from "../persistence/DAOs/factory.js";


export const getAllCartsService = async () => {
  const cart = await cartDao.getAllCarts();
  return cart;
};

export const createCartService = async (prod) => {
  const newCart = await cartDao.createCart(prod);
  return newCart;
};

export const getCartByIdService = async (cid) => {
  const cart = await cartDao.getCartById(cid);
  return cart;
};

export const addProductToCartService = async (cid, pid) => {
  await cartDao.addProductToCart(cid, pid);
};

export const deleteProductFromCartService = async (cid, pid) => {
  const cart = await cartDao.deleteProductFromCart(cid, pid);
  return cart;
};

export const deleteAllProductsService = async (cid) => {
  const cart = await cartDao.deleteAllProducts(cid);
  return cart;
};

export const updateQuantityOfProductService = async (cid, pid, newQuantity) => {
  const cart = await cartDao.updateQuantityOfProduct(cid, pid, newQuantity);
  return cart;
};

export const updateProductsService = async (cid, newProducts) => {
  await cartDao.updateProducts(cid, newProducts);
};
