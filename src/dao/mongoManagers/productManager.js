import { productsModel } from "../models/products.model.js";

export default class ProductManager {
  async getProducts() {
    try {
      const products = await productsModel.find().lean();
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(product) {
    try {
      const newProduct = await productsModel.create(product);
      return newProduct;
    } catch (error) {
      console.log(error);
    }
  }
  async getProdutcById(ID) {
    try {
      const productFindByID = await productsModel.findById(ID);
      return productFindByID;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(ID, product) {
    try {
      const productUpdate = await productsModel.findByIdAndUpdate(ID, product);
      return productUpdate;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(ID) {
    const deleteProduct = await productsModel.findByIdAndRemove(ID);
  }
}
