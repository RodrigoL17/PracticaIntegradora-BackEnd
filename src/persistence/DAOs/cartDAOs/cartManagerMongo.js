import { cartsModel } from "../../Mongo/models/carts.model.js";

export default class cartManager {
  async getAllCarts() {
    try {
      return await cartsModel.find();
    } catch (error) {
      console.log(error);
    }
  }

  async createCart(userId) {
    try {
      const newCart = await cartsModel.create({userId: userId, products: []});
      return newCart;
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(cid) {
    try {
      return await cartsModel.findOne({ _id: cid });
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const cart = await cartsModel.findById(cid);
      
      const existingProduct = cart.products.find(
        (product) => product.pid._id.toString() === pid
      );
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.products.push({ pid, quantity: 1 });
      }
      await cart.save();
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProductFromCart(cid, pid) {
    try {
      const cart = await cartsModel.findById(cid);
      const productIndex = cart.products.findIndex(
        (product) => product.pid.toString() === pid
      );
      if (productIndex === -1) {
        return "No existe el producto en el carrito";
      }
      cart.products.splice(productIndex, 1);
      await cart.save();
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAllProducts(cid) {
    try {
      return await cartsModel.findByIdAndUpdate(cid, { products: [] });
    } catch (error) {
      console.log(error);
    }
  }

  async updateQuantityOfProduct(cid, pid, newQuantity) {
    try {
      const cart = await cartsModel.findById(cid);
      const productIndex = cart.products.findIndex(
        (product) => product.pid.toString() === pid
      );

      if (productIndex === -1 || !newQuantity) {
        return "El producto ingresado no existe o no has ingresado la cantidad";
      }

      cart.products[productIndex].quantity = newQuantity;
      await cartsModel.findByIdAndUpdate(cid, cart);
    } catch (error) {
      console.log(error);
    }
  }

  async updateProducts(cid, newProducts) {
    try {
     const cart = await cartsModel.findByIdAndUpdate(cid, { products: newProducts },{new: true});
     return cart
    } catch (error) {
      console.log(error);
    }
  }

  async findCartByUserId(userId) {
    const cart = await cartsModel.find({userId: userId});
    return cart
  }
}
