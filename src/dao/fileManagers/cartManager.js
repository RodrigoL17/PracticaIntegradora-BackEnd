import fs from "fs";

export default class cartManager {
  constructor() {
    this.path = "./Cart.json";
  }

  async getCart() {
    if (fs.existsSync(this.path)) {
      try {
        const cart = await fs.promises.readFile(this.path, "utf-8");
        const cartJS = JSON.parse(cart);
        return cartJS;
      } catch (error) {
        console.log(error);
      }
    } else {
      return [];
    }
  }

  async createCart(prod) {
    try {
      const cartFile = await this.getCart();
      let id;
      if (prod.id && cartFile.length === 0) {
        id = 1;
      } else {
        id = cartFile[cartFile.length - 1].id + 1;
      }
      const newCart = { id, products: [{ pid: prod.id, quantity: 1 }] };
      cartFile.push(newCart);
      await fs.promises.writeFile(this.path, JSON.stringify(cartFile));
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(ID) {
    const cartFile = await this.getCart();
    const cartFindByID = cartFile.find((cart) => cart.id === ID);
    return cartFindByID
  }

  async addProduct(cid, pid) {
    const cartFile = await this.getCart();
    if (cid) {
      const searchCart = await this.getCartById(cid);
      if (searchCart) {
        const cartIndex = cartFile.findIndex((elem) => elem.id === searchCart.id);
        const searchProd = searchCart.products.find((prod) => prod.pid === pid);
        const prodIndex = searchCart.products.findIndex(
          (prod) => prod.pid === pid
        );
        if (prodIndex > -1) {
          const newProd = { ...searchProd, quantity: searchProd.quantity + 1 };
          searchCart.products.splice(prodIndex, 1, newProd);
          cartFile.splice(cartIndex,1,searchCart)
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(cartFile)
          );
        } else {
          searchCart.products.push({ pid, quantity: 1 });
          cartFile.splice(cartIndex,1,searchCart)
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(cartFile)
          );
        }
      } else {
        console.log("El carrito ingresado no existe");
      }
    } else {
      console.log("no has ingresado el carrito");
    }
  }
}
