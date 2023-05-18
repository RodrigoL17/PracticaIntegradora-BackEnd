import { productsModel } from "../../Mongo/models/products.model.js";

export default class ProductManager {
  async getAllProducts(limit, page, sort, query) {
    const options = {
      limit: limit,
      page: page,
      sort: !sort ? {} : { price: sort },
    };
    try {
      const products = await productsModel.paginate(query, options);
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  async getProdutcById(ID) {
    try {
      return await productsModel.findById(ID);
    } catch (error) {
      console.log(error)
    }
  }
  async addProduct(product, _id) {
    try {
      const newProduct = await productsModel.create(product);
      return newProduct;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, product) {
    try {
      const productUpdate = await productsModel.findByIdAndUpdate(id, product);
      return productUpdate;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    return await productsModel.findByIdAndDelete(id);
  }

  async updateStock(pid, stock, quantity) {
    try {
      await productsModel.findByIdAndUpdate(pid, { stock: stock - quantity });
    } catch (error) {
      console.log(error);
    }
  }
}
