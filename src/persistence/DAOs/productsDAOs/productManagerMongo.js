import { productsModel } from "../../Mongo/models/products.model.js";

export default class ProductManager {
  async getAll(limit, page, sort, query) {
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

  async getById(id) {
    try {
      return await productsModel.findById(id);
    } catch (error) {
      console.log(error);
    }
  }
  async create(product) {
    try {
      const newProduct = await productsModel.create(product);
      return newProduct;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, product) {
    try {
      const productUpdate = await productsModel.findByIdAndUpdate(id, product);
      return productUpdate;
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id) {
    return await productsModel.findByIdAndDelete(id);
  }

  async updateStock(id, quantity) {
    try {
      const product = await productsModel.findById(id);
      const updatedStock = product.stock - quantity;
      await productsModel.findByIdAndUpdate(id, {
        $set: { stock: updatedStock },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
