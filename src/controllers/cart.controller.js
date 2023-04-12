import {
  createCart,
  getCartById,
  addProductToCart,
  deleteProductFromCart,
  deleteAllProducts,
  updateQuantityOfProduct,
  updateProducts,
} from "../services/cart.services.js";

export const createCartController = async (req, res) => {
  const product = req.body;
  if (Object.keys(product).length === 0 || (!product.id && !product._id)) {
    res.json({
      message:
        "No has ingresado ningun producto o el producto ingresado no tiene Id",
    });
  } else {
    await createCart(product);
    res.json({ message: "creaste un nuevo carrito" });
  }
};

export const getCartByIdController = async (req, res) => {
  const { cid } = req.params;
  const cartFound = await getCartById(cid);
  res.json(cartFound);
};

export const addProductToCartController = async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await addProductToCart(cid, pid);
  res.json({ message: "producto agregado al carrito", cart });
};

export const deleteProductFromCartController = async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await deleteProductFromCart(cid, pid);
  res.json({ cart });
};

export const deleteAllProductsController = async (req, res) => {
  const { cid } = req.params;
  const cart = await deleteAllProducts(cid);
  res.json({ message: "carrito vaciado con exito", cart });
};

export const updateQuantityOfProductController = async (req, res) => {
  const { cid, pid } = req.params;
  const newQuantity = req.body;
  const cart = await updateQuantityOfProduct(cid, pid, newQuantity.quantity);
  res.json({ message: "cantidad modificada", cart });
};

export const updateProductsController = async (req, res) => {
  const { cid } = req.params;
  const { newProducts } = req.body;
  const cart = await updateProducts(cid, newProducts);
  res.json({ cart });
};
