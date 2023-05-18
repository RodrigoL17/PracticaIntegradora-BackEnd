import {
  createCartService,
  getCartByIdService,
  addProductToCartService,
  deleteProductFromCartService,
  deleteAllProductsService,
  updateQuantityOfProductService,
  updateProductsService,
} from "../services/cart.services.js";
import { getProdById } from "../services/products.services.js";
import {
  cartByIdNotRecived,
  checkExistsProd,
  checkQuantityToUpdateCartProducts,
  checkRequiredProdProperties,
  prodByIdNotRecived,
} from "../utils/Errors/utils.js";

export const getCartByIdController = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cartFound = await getCartByIdService(cid);
    cartByIdNotRecived(cartFound);
    res.json(cartFound);
  } catch (error) {
    next(error);
  }
};

//falta cambiar
export const addProductToCartController = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const cart = await getCartByIdService(cid);
    const product = await getProdById(pid);
    cartByIdNotRecived(cart);
    prodByIdNotRecived(product);
    const newCart = await addProductToCartService(cid, pid);
    res.json({ message: "producto agregado al carrito", cart: newCart });
  } catch (error) {
    next(error);
  }
};
//falta cambiar
export const deleteProductFromCartController = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const cart = await getCartByIdService(cid);
    const product = await getProdById(pid);
    cartByIdNotRecived(cart);
    prodByIdNotRecived(product);
    const newCart = await deleteProductFromCartService(cid, pid);
    res.json({ newCart });
  } catch (error) {
    next(error);
  }
};

export const deleteAllProductsController = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await getCartByIdService(cid);
    cartByIdNotRecived(cart);
    const newCart = await deleteAllProductsService(cid);
    res.json({ message: "carrito vaciado con exito", cart: newCart });
  } catch (error) {
    next(error);
  }
};
export const updateQuantityOfProductController = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const cart = await getCartByIdService(cid);
    const product = await getProdById(pid);
    cartByIdNotRecived(cart);
    prodByIdNotRecived(product);
    const { quantity } = req.body;
    checkQuantityToUpdateCartProducts(quantity);
    const newCart = await updateQuantityOfProductService(cid, pid, quantity);
    res.json({ message: "cantidad modificada", cart: newCart });
  } catch (error) {
    next(error);
  }
};
//falta cambiar
export const updateProductsController = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await getCartByIdService(cid);
    cartByIdNotRecived(cart);
    const { newProducts } = req.body;
    newProducts.forEach((prod) => {
      checkExistsProd(prod);
      checkRequiredProdProperties(prod);
    });
    const newCart = await updateProductsService(cid, newProducts);
    cartByIdNotRecived(cart);
    res.json({ newCart });
  } catch (error) {
    next(error);
  }
};
