import { cartsModel } from "../models/carts.model.js";

export default class cartManager {
  async getCart() {
    try {
      const carts = await cartsModel.find();
      return carts
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

  async getCartById(ID) {
    try {
      const findCartById = await cartsModel.findById(ID);
      return findCartById;
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(cid, pid) {
    try {
      const cart = await this.getCartById(cid);
      const searchProd = cart.products.find((prod) => prod.pid === pid);
        if (searchProd) {
         const prodIndex = cart.products.findIndex(prod => prod.pid === pid)
         const newProd = { ...searchProd, quantity: searchProd.quantity + 1 };
         cart.products.splice(prodIndex,1, newProd)
       } else {
         cart.products.push({ pid: pid, quantity: 1 });
       }

        await cartsModel.findByIdAndUpdate(cid,{products: cart.products})
    } catch (error) {
      console.log(error);
    }
  }
}
