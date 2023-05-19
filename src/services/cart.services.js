import { cartDao } from "../persistence/DAOs/factory.js";

const getAll = async () => {
  const cart = await cartDao.getAll();
  return cart;
};

const getById = async (cid) => {
  const cart = await cartDao.getById(cid);
  return cart;
};

const getByUserId = async (userId) => {
  const cart = await cartDao.getByUserId(userId);
  return cart;
};

const create = async (userId) => {
  const newCart = await cartDao.create(userId);
  return newCart;
};

const addProd = async (cid, pid) => {
  await cartDao.addProd(cid, pid);
};

const oneMoreProd = async (cid, pid) => {
  await cartDao.oneMoreProd(cid, pid);
}
const updateQuantityOfProd = async (cid, pid, newQuantity) => {
  const cart = await cartDao.updateQuantityOfProd(cid, pid, newQuantity);
  return cart;
};

const updateProds = async (cid, newProducts) => {
  await cartDao.updateProds(cid, newProducts);
};

const deleteProd = async (cid, pid) => {
  const cart = await cartDao.deleteProd(cid, pid);
  return cart;
};

const deleteAllProds = async (cid) => {
  const cart = await cartDao.deleteAllProds(cid);
  return cart;
};



export default {getAll, create, getById, addProd, deleteProd, deleteAllProds, updateQuantityOfProd, updateProds, getByUserId, oneMoreProd}