import cartService from "../services/cart.services.js";
import prodService from "../services/products.services.js";
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

const addProductToCart = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartService.getById(cid);
    const product = await prodService.getById(pid);
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
      res.setHeader("X-Message", "Producto agregado correctamente");
      res.sendStatus(204);
    }
    if(existingProduct){
      //if product already exists in cart +1 to quatity
      await cartService.oneMoreProd(cid,pid)
      res.setHeader("X-Message", "Producto agregado correctamente");
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
};

const deleteProductFromCart = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartService.getById(cid);
    const product = await prodService.getById(pid);
    cartByIdNotRecived(cart);
    prodByIdNotRecived(product);
    const newCart = await cartService.deleteProd(cid, pid);
    //falta cambiar ----> ver si es necesario rescatar el cart o renderizarlo
    res.json({ newCart });
  } catch (error) {
    next(error);
  }
};

const deleteAllProductsFromCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await cartService.getById(cid);
    cartByIdNotRecived(cart);
    const newCart = await cartService.deleteAllProds(cid);
    //falta cambiar ----> ver si el res es necesario 
    res.json({ message: "carrito vaciado con exito", cart: newCart });
  } catch (error) {
    next(error);
  }
};

const updateQuantityOfProductFromCart = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const cart = await getCartByIdService(cid);
    const product = await prodService.getById(pid);
    cartByIdNotRecived(cart);
    prodByIdNotRecived(product);
    const { quantity } = req.body;
    checkQuantityToUpdateCartProducts(quantity);
    const newCart = await cartService.updateQuantityOfProd(cid, pid, quantity);
    //falta cambiar ----> ver si es necesaria esta respuesta
    res.json({ message: "cantidad modificada", cart: newCart });
  } catch (error) {
    next(error);
  }
};

export default {getCartById, addProductToCart, deleteProductFromCart, deleteAllProductsFromCart, updateQuantityOfProductFromCart}