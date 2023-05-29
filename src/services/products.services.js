import { productsDao } from "../persistence/DAOs/factory.js";

const getAll = async (limit, page, sort, query) => {
  const products = await productsDao.getAll(limit, page, sort, query);
  return products;
};

const getById = async (id) => {
  const product = await productsDao.getById(id);
  return product;
};

const create = async (product) => {
  const newProduct = await productsDao.create(product);
  return newProduct;
};

const update = async (id, product) => {
  const updatedProduct = await productsDao.updateProduct(id, product);
  return updatedProduct;
};

const remove = async (id) => {
  return await productsDao.deleteProduct(id);
};

//Falta chekiar donde lo estoy usando
const updateStock = async (id, quantity) => {
  await productsDao.updateStock(id, quantity);
};

export default {getAll, getById, create, update, remove, updateStock}