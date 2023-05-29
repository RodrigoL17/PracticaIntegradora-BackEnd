import cartService from "../services/cart.services.js";
import productsServices from "../services/products.services.js";
import prodService from "../services/products.services.js";
import ticketsService from "../services/ticket.services.js";
import { transporter } from "../Utilities/NodeMailer/nodemailer.js";
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
        await cartService.addProd(cid, pid);
        res.setHeader("X-Message", "Producto agregado correctamente");
        res.sendStatus(204);
      } else {
        await cartService.addProdQuantity(cid, pid, quantity);
        res.setHeader("X-Message", "Producto agregado correctamente");
        res.sendStatus(204);
      }
    }
    if (existingProduct) {
      if (!quantity || quantity === 1) {
        //if product already exists in cart +1 to quatity
        await cartService.oneMoreProd(cid, pid);
        res.setHeader("X-Message", "Producto agregado correctamente");
        res.sendStatus(204);
      } else {
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
    const { email, first_name, last_name } = cart.userId;
    const { products } = cart;
    const toRemove = [];
    const toCheckOut = [];
    let totalAmount = 0;
    await Promise.all(
      products.map(async (prod) => {
        if (prod.quantity > prod.pid.stock) {
          toRemove.push(prod);
        } else {
          // await productsServices.updateStock(prod.pid._id, prod.quantity);
          totalAmount += prod.pid.price * prod.quantity;
          toCheckOut.push(prod);
        }
      })
    );
    if (toCheckOut.length > 0) {
      const ticket = { amount: totalAmount, purchaser: email };
      await ticketsService.create(ticket)
      // await transporter.sendMail({
      //   from: "ECOMMERCE",
      //   to: email,
      //   subject: "Compra Exitosa",
      //   text: `Muchas gracias ${first_name} ${last_name} por confiar en nosotros, tu compra se ha realizado con exito, el monto total es de $${totalAmount}.`,
      // });
    }
    if (toCheckOut.length > 0) {
     await cartService.updateProds(cid, toRemove);
    }
    const newCart = await cartService.getById(cid);
    res.render("Cart/purchase", {
      cart: newCart,
      amount: totalAmount,
      user: cart.userId,
    });
  } catch (error) {
    console.log(error);
  }
};

export default {
  getCartById,
  addProductToCart,
  deleteProductFromCart,
  deleteAllProductsFromCart,
  updateQuantityOfProductFromCart,
  purchase,
};
