import {
  createCartService,
  getCartByIdService,
  addProductToCartService,
  deleteProductFromCartService,
  deleteAllProductsService,
  updateQuantityOfProductService,
  updateProductsService,
} from "../services/cart.services.js";
import {
  checkCID,
  checkPIDforCart,
  recivedProdExists,
} from "../utils/errors/utils.js";

export const createCartController = async (req, res) => {
  const product = req.body;
  if (Object.keys(product).length === 0 || (!product.id && !product._id)) {
    CustomError.createCustomError({
      name: errorName.CART_ERROR,
      cause: `${errorCause.MISSING_PRODUCT} or ${errorCause.MISSING_ID}`,
      message: errorMessage.PRODUCT_DATA_INCOMPLETE,
    });
  }
  try {
    await createCartService(product);
    return res.json({ message: "creaste un nuevo carrito" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al crear el carrito" });
  }
};

export const getCartByIdController = async (req, res) => {
  const { cid } = req.params;
  try {
    const cartFound = await getCartByIdService(cid);
    res.json(cartFound);
  } catch (error) {
    console.log(error);
  }
};

export const addProductToCartController = async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const cart = await addProductToCartService(cid, pid);
    res.json({ message: "producto agregado al carrito", cart });
  } catch (error) {
    checkCID(cid);
    checkPIDforCart(pid);
  }
};

export const deleteProductFromCartController = async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const cart = await deleteProductFromCartService(cid, pid);
    res.json({ cart });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllProductsController = async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await deleteAllProductsService(cid);
    res.json({ message: "carrito vaciado con exito", cart });
  } catch (error) {
    console.log(error);
  }
};

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

export const updateProductsController = async (req, res) => {
  const { cid } = req.params;
  const { newProducts } = req.body;
  recivedProdExists(newProducts);
  try {
    const cart = await updateProductsService(cid, newProducts);
    res.json({ cart });
  } catch (error) {
    console.log(error);
  }
};
