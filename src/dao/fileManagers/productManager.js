import fs from "fs";

// const fs = require("fs");

export default class ProductManager {
  constructor() {
    this.path = "./Products.json";
  }
  async getProducts() {
    if (fs.existsSync(this.path)) {
      try {
        const products = await fs.promises.readFile(this.path, "utf-8");
        const productsJS = JSON.parse(products);
        return productsJS;
      } catch (error) {
        console.log(error);
      }
    } else {
      return [];
    }
  }
  async addProduct(product) {
    try {
      const productsFile = await this.getProducts();
      let id;
      if (productsFile.length === 0) {
        id = 1;
      } else {
        id = productsFile[productsFile.length - 1].id + 1;
      }
      const newProduct = { id, ...product };
      productsFile.push(newProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
    } catch (error) {
      console.log(error);
    }
  }
  async getProdutcById(ID) {
    const productsFile = await this.getProducts();
    const productFindByID = productsFile.find((product) => product.id === ID);
    return productFindByID;
  }

  async updateProduct(ID, product) {
    const productsFile = await this.getProducts();
    const productsFileUpdate = productsFile.map((prodf) =>
      prodf.id === ID ? { ...prodf, ...product } : prodf
    );
    await fs.promises.writeFile(this.path, JSON.stringify(productsFileUpdate));
  }

  async deleteProduct(ID) {
    const productFind = await this.getProdutcById(ID);
    const search = await this.getProducts();
    const index = search.findIndex((prod) => prod.id === ID);
    if (index === -1) {
      console.log("no se encontro producto");
      return;
    }
    const newSearch = search.splice(index, 1);
    await fs.promises.writeFile(this.path, JSON.stringify(search));
  }
}
