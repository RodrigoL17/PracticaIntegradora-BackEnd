import {
  createCartService,
  getCartByIdService,
  addProductToCartService,
  deleteProductFromCartService,
  deleteAllProductsService,
  updateQuantityOfProductService,
  updateProductsService,
} from "../services/cart.services.js";

export const createCartController = async (req, res) => {
  const product = req.body;
  if (Object.keys(product).length === 0 || (!product.id && !product._id)) {
    res.json({
      message:
        "No has ingresado ningun producto o el producto ingresado no tiene Id",
    });
  } else {
    await createCartService(product);
    res.json({ message: "creaste un nuevo carrito" });
  }
};

export const getCartByIdController = async (req, res) => {
  const { cid } = req.params;
  const cartFound = await getCartByIdService(cid);
  res.json(cartFound);
};

export const addProductToCartController = async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await addProductToCartService(cid, pid);
  res.json({ message: "producto agregado al carrito", cart });
};

export const deleteProductFromCartController = async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await deleteProductFromCartService(cid, pid);
  res.json({ cart });
};

export const deleteAllProductsController = async (req, res) => {
  const { cid } = req.params;
  const cart = await deleteAllProductsService(cid);
  res.json({ message: "carrito vaciado con exito", cart });
};

export const updateQuantityOfProductController = async (req, res) => {
  const { cid, pid } = req.params;
  const newQuantity = req.body;
  const cart = await updateQuantityOfProductService(cid, pid, newQuantity.quantity);
  res.json({ message: "cantidad modificada", cart });
};

export const updateProductsController = async (req, res) => {
  const { cid } = req.params;
  const { newProducts } = req.body;
  const cart = await updateProductsService(cid, newProducts);
  res.json({ cart });
};


