import cartService from "../services/cart.services.js";
import { getProdById } from "../services/products.services.js";
import {
  cartByIdNotRecived,
  checkExistsProd,
  checkQuantityToUpdateCartProducts,
  checkRequiredProdProperties,
  prodByIdNotRecived,
} from "../Utilities/Errors/utils.js";

const getCartById = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cartFound = await cartService.getById(cid);
    cartByIdNotRecived(cartFound);
    //falta cambiar ----> crear view para render cart
    res.json(cartFound);
  } catch (error) {
    next(error);
  }
};

//falta cambiar
const addProductToCart = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartService.getById(cid);
    const product = await getProdById(pid);
    //check if cart and product already exist
    cartByIdNotRecived(cart);
    prodByIdNotRecived(product);
    //check if product already exists in cart
    const existingProduct = cart.products.find(
      (prod) => prod.pid.toString() === pid
    );
    if(cart.products.length === 0 || !existingProduct) {
      //if cart is empty or product does not exist in cart, add product
      await cartService.addProd(cid, pid);
    }
    if(existingProduct){
      //if product already exists in cart +1 to quatity
      await cartService.oneMoreProd(cid,pid)
    }
  } catch (error) {
    next(error);
  }
};
//falta cambiar
const deleteProduct = async (req, res, next) => {
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
//falta cambiar
const deleteAllProducts = async (req, res, next) => {
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
//falta cambiar
const updateQuantityOfProduct = async (req, res, next) => {
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
const updateBulkProducts = async (req, res, next) => {
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

export default {getCartById, addProductToCart, deleteProduct, deleteAllProducts, updateQuantityOfProduct ,updateBulkProducts}