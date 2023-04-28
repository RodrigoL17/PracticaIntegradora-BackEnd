import { cartDao, productsDao } from "../persistence/DAOs/factory.js";

export const checkStockAndObtainProductsToRemove = async (cid) => {
  const cart = await cartDao.getCartById(cid);
  const { products } = cart;
  const toRemove = [];

  const promises = products.map(async (product, i) => {
    const searchProd = await productsDao.getProdutcById(product.pid._id);
    if (product.quantity <= searchProd.stock) {
      await productsDao.updateStock(
        searchProd._id,
        searchProd.stock,
        product.quantity
      );
    } else {
      const removed = products.splice(i, 1);
      const [first] = removed;
      toRemove.push(first);
    }
  });
  await Promise.all(promises);

  return toRemove;
};

export const cartFilter = async (prodsToRem, cid) => {
  const cart = await cartDao.getCartById(cid);

  const { products } = cart;

  if (prodsToRem.length > 0) {
    const toPurchase = products.filter((item1) =>
      !prodsToRem.some(
        (item2) => item1.pid._id.toString() === item2.pid._id.toString()
      )
    );
    return toPurchase;
  } else {
    return null;
  }
};
