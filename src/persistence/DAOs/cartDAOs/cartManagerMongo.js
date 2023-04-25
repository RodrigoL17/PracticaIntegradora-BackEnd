import { cartsModel } from "../../Mongo/models/carts.model.js";

export default class cartManager {
  async getAllCarts() {
    try {
      const carts = await cartsModel.find();
      return carts;
    } catch (error) {
      console.log(error);
    }
  }

  async createCart(prod) {
    try {
      const newCart = await cartsModel.create({
        products: { pid: prod._id, quantity: 1 },
      });
      return newCart;
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(cid) {
    try {
      const findCartById = await cartsModel.findOne({ _id: cid });
      return findCartById;
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCart(cid, pid) {
   
    try {
      const cart = await cartsModel.findById(cid);
      const searchProd = cart.products.find(
        (prod) =>   prod.pid._id.toString() === pid
      );
      if (searchProd) {
        const prodIndex = cart.products.findIndex(
          (prod) => prod.pid._id.toString() === pid
        );
        const newProd = { pid, quantity: searchProd.quantity + 1 };
        cart.products.splice(prodIndex, 1, newProd);
      } else {
        cart.products.push({ pid, quantity: 1 });
      }
      await cartsModel.findByIdAndUpdate(cid, cart);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProductFromCart(cid, pid) {
    try {
      const cart = await cartsModel.findById(cid);
      const index = cart.products.findIndex(
        (prod) => prod.pid.toString() === pid
      );
      if (index > -1) {
        cart.products.splice(index, 1);
        cart.save();
        return cart;
      } else {
        return "no existe el producto en el carrito";
      }
    } catch (error) {
      console.log(error);
    }
  }
  async deleteAllProducts(cid) {
    try {
      const cart = await cartsModel.findByIdAndUpdate(cid, { products: [] });
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async updateQuantityOfProduct(cid, pid, newQuantity) {
    try {
      const cart = await cartsModel.findById(cid);
      const searchProd = cart.products.find(
        (prod) => prod.pid.toString() === pid
      );
      if (searchProd && newQuantity) {
        const prodIndex = cart.products.findIndex(
          (prod) => prod.pid.toString() === pid
        );
        const newProd = { pid, quantity: newQuantity };
        cart.products.splice(prodIndex, 1, newProd);
        await cartsModel.findByIdAndUpdate(cid, cart);
      } else {
        return "El producto ingresado no existe o no has ingresado la cantidad";
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateProducts(cid, newProducts) {
    try {
      await cartsModel.findByIdAndUpdate(cid, { products: newProducts });
    } catch (error) {
      console.log(error);
    }
  }
}
