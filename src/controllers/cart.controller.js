import {
  createCartService,
  getCartByIdService,
  addProductToCartService,
  deleteProductFromCartService,
  deleteAllProductsService,
  updateQuantityOfProductService,
  updateProductsService,
} from "../services/cart.services.js";
import { cartByIdNotRecived, checkExistsProd } from "../utils/errors/utils.js";

export const createCartController = async (req, res) => {
  try {
    const product = req.body;
    checkExistsProd(product)
    await createCartService(product);
    return res.json({ message: "creaste un nuevo carrito" });
  } catch (error) {
    next(error);
    return res.status(500).json({ message: "Error al crear el carrito" });
  }
};

export const getCartByIdController = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cartFound = await getCartByIdService(cid);
    cartByIdNotRecived(cartFound)
    res.json(cartFound);
  } catch (error) {
   next(error);
  }
};

//falta cambiar
export const addProductToCartController = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const cart = await addProductToCartService(cid, pid);
    res.json({ message: "producto agregado al carrito", cart });
  } catch (error) {
   next(error)
  }
};
//falta cambiar
export const deleteProductFromCartController = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await deleteProductFromCartService(cid, pid);
    res.json({ cart });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllProductsController = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await deleteAllProductsService(cid);
    cartByIdNotRecived(cid)
    res.json({ message: "carrito vaciado con exito", cart });
  } catch (error) {
    next(error);
  }
};
//falta cambiar
export const updateQuantityOfProductController = async (req, res) => {
  const { cid, pid } = req.params;
  const newQuantity = req.body;
  try {
    const cart = await updateQuantityOfProductService(
      cid,
      pid,
      newQuantity.quantity
    );
    res.json({ message: "cantidad modificada", cart });
  } catch (error) {
    console.log(error);
  }
};
//falta cambiar
export const updateProductsController = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const { newProducts } = req.body;
    const cart = await updateProductsService(cid, newProducts);
    cartByIdNotRecived(cart)
    res.json({ cart });
  } catch (error) {
    next(error);
  }
};
