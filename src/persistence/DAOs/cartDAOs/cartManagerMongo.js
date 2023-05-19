import { cartsModel } from "../../Mongo/models/carts.model.js";

export default class cartManager {
  async getAll() {
    //Get all carts
    try {
      return await cartsModel.find();
    } catch (error) {
      console.log(error);
    }
  }
  async getById(cid) {
    // Get the cart by its id
    try {
      return await cartsModel.findOne({ _id: cid });
    } catch (error) {
      console.log(error);
    }
  }

  async getByUserId(userId) {
    //  Gets cart by user Id associated
    const cart = await cartsModel.find({ userId: userId });
    return cart;
  }

  async create(userId) {
    // Create a new cart for the user
    try {
      const newCart = await cartsModel.create({ userId: userId, products: [] });
      return newCart;
    } catch (error) {
      console.log(error);
    }
  }

  async addProd(cid, pid) {
    // Add one product to cart
    try {
      const cart = await cartsModel.findByIdAndUpdate(
        cid,
        { $push: { products: { pid, quantity: 1 } } },
        { new: true }
      );
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async oneMoreProd(cid, pid) {
    //Increment in 1 quantity number of product from the cart
    try {
      const cart = await cartsModel.findByIdAndUpdate(
        cid,
        { $inc: { "products.$[elem].quantity": 1 } },
        { new: true, arrayFilters: [{ "elem.pid": pid }] }
      );
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async updateQuantityOfProd(cid, pid, newQuantity) {
    // Update quantity of the product which Id matches from the cart
    try {
      const cart = await cartsModel.findByIdAndUpdate(
        cid,
        { $set: { "products.$[elem].quantity": newQuantity } },
        { new: true, arrayFilters: [{ "elem.pid": pid }] }
      );
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
  async updateProds(cid, newProducts) {
    try {
      // Updates one or more products (all kind of properties) from the cart
      const cart = await cartsModel.findByIdAndUpdate(
        cid,
        { products: newProducts },
        { new: true }
      );
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteProd(cid, pid) {
    //Delete a product from the cart
    try {
      const cart = await cartsModel.findByIdAndUpdate(
        cid,
        { $pull: { products: { pid: pid } } },
        { new: true }
      );
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAllProds(cid) {
    // Remove all products from the cart
    try {
      return await cartsModel.findByIdAndUpdate(cid, { products: [] });
    } catch (error) {
      console.log(error);
    }
  }
}
