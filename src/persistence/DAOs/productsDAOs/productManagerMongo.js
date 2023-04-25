import { productsModel } from "../../Mongo/models/products.model.js";

export default class ProductManager {
  async getAllProducts(limit, page, sort, query) {
    const options = {
      limit: limit,
      page: page,
      sort: !sort ? {} : { price: sort },
    };
    try {
      // paginate(query, options) resolver paginado no anda
      const products = await productsModel.find();
      return products;
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
  async addProduct(product) {
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
    await productsModel.findByIdAndRemove(id);
  }

  async updateStock(pid,stock, quantity){
    try {
      await productsModel.findByIdAndUpdate(pid, {stock: stock-quantity})
    } catch (error) {
      console.log(error)
    }
  }
}
