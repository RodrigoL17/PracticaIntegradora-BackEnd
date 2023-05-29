import cartService from "../services/cart.services.js";
import prodService from "../services/products.services.js";
import {
  checkStockAndObtainProductsToRemove,
  cartFilter,
} from "../services/purchase.services.js";
import { createTicketService } from "../services/ticket.services.js";
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
    const { quantity } = req.body;
    const cart = await cartService.getById(cid);
    const product = await prodService.getById(pid);
    //check if cart and product already exist
    cartByIdNotRecived(cart);
    prodByIdNotRecived(product);
    // check if product already exists in cart
    const existingProduct = cart.products.find(
      (prod) => prod.pid._id.toString() === product._id.toString()
    );
    if (cart.products.length === 0 || !existingProduct) {
      //if cart is empty or product does not exist in cart, add product
      if (!quantity || quantity === 1) {
        console.log("quantity undefined o 1 no existe")
        await cartService.addProd(cid, pid);
        res.setHeader("X-Message", "Producto agregado correctamente");
        res.sendStatus(204);
      } else {
        console.log("2 prod no existe")
        await cartService.addProdQuantity(cid, pid, quantity);
        res.setHeader("X-Message", "Producto agregado correctamente");
        res.sendStatus(204);
      }
    }
    if (existingProduct) {
      if (!quantity || quantity === 1) {
        console.log("quantity undefined o 1 existe")
        //if product already exists in cart +1 to quatity
        await cartService.oneMoreProd(cid, pid);
        res.setHeader("X-Message", "Producto agregado correctamente");
        res.sendStatus(204);
      } else {
        console.log("2 prod existe")
        await cartService.updateQuantityOfProd(cid, pid, quantity);
        res.setHeader("X-Message", "Producto agregado correctamente");
        res.sendStatus(204);
      }
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
    await cartService.deleteProd(cid, pid);
    res.setHeader("X-Message", "Producto eliminado correctamente");
    res.sendStatus(204);
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
  //falta revisa bien
  try {
    const { cid, pid } = req.params;
    const cart = await cartService.getById(cid);
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

export const purchase = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartService.getById(cid);
    console.log("cart", cart);
    const { products } = cart;
    const { email } = cart.userId;
    const toRemove = [];

    const promises = products.map(async (product, i) => {
      const searchProd = await prodService.getById(product.pid._id);
      if (product.quantity <= searchProd.stock) {
        await productsDao.updateStock(
          searchProd._id,
          searchProd.stock,
          product.quantity
        );
      } else {
        const removed = products.splice(i, 1);
        const [first] = removed;
        toRemove.push(first);
      }
    });
    await Promise.all(promises);
  } catch (error) {
    console.log(error);
  }
  // const productsToRemove = await checkStockAndObtainProductsToRemove(cid);
  // const cartFiltered = await cartFilter(productsToRemove, cid);
  // const amount = cartFiltered.reduce((acc, prod) => {
  //   return acc + prod.pid.price * prod.quantity;
  // }, 0);
  // const ticketc = await createTicketService(ticket);
  // const cart = await cartService.updateProds(cid, productsToRemove);
  // res.json({
  //   message: "Su compra se ha realizado con exito",
  //   ticket: ticketc,
  //   cart: cart,
  //   productosSinStock: productsToRemove.map((prod) => prod.pid._id),
  // });
};

export default {
  getCartById,
  addProductToCart,
  deleteProductFromCart,
  deleteAllProductsFromCart,
  updateQuantityOfProductFromCart,
  purchase,
};
