import ProductsDao from "../persistence/DAOs/productsDAOs/productManagerMongo.js";
// import ProductsDao from "../persistence/DAOs/productsDAOs/productManagerFS.js";

const productsDao = new ProductsDao();

export const getAllProds = async (limit, page, sort, query) => {
  const products = await productsDao.getAllProducts(limit, page, sort, query);
  return products;
}

export const getProdById = async (id) => {
  const product = await productsDao.getProdutcById(id);
  return product;
};

export const addProd = async (product) => {
  const newProduct = await productsDao.addProduct(product);
  return newProduct;
};

export const updateProd = async (id, product) => {
  const updatedProduct = await productsDao.updateProduct(id, product);
  return updatedProduct;
};

export const deleteProd = async (id) => {
  await productsDao.deleteProduct(id);
};
