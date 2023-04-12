import CartDao from "../persistence/DAOs/cartDAOs/cartManagerMongo.js";
// import CartDao from "../persistence/DAOs/cartDAOs/cartManagerFs"

const cartDao = new CartDao();

export const getAllCarts = async () => {
  const cart = await cartDao.getAllCarts();
  return cart;
};

export const createCart = async (prod) => {
  const newCart = await cartDao.createCart(prod);
  return newCart;
};

export const getCartById = async (cid) => {
  const cart = await cartDao.getCartById(cid);
  return cart;
};

export const addProductToCart = async (cid, pid) => {
  await cartDao.addProductToCartById(cid, pid);
};

export const deleteProductFromCart = async (cid, pid) => {
  const cart = await cartDao.deleteProductFromCart(cid, pid);
  return cart;
};

export const deleteAllProducts = async (cid) => {
    const cart = await cartDao.deleteAllProducts(cid)
    return cart;
}

export const updateQuantityOfProduct = async (cid, pid, newQuantity) => {
    const cart = await cartDao.updateQuantityOfProduct(cid,pid, newQuantity)
    return cart;
}

export const updateProducts = async (cid, newProducts) => {
    await cartDao.updateProducts(cid,newProducts)
}
