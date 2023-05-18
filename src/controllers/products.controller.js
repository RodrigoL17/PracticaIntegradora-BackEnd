import {
  getAllProds,
  addProd,
  getProdById,
  updateProd,
  deleteProd,
} from "../services/products.services.js";
import { checkRequiredProdProperties, prodByIdNotRecived } from "../utils/errors/utils.js";

export const getAllProducts = async (req, res) => {
  const { limit = 10, page = 1, sort, ...query } = req.query;
  const products = await getAllProds(limit, page, sort, query);
  if (products) {
    res.json({
      status: "success",
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.prevPage
        ? `http://localhost:3000/api/products?page=${products.prevPage}`
        : null,
      nextLink: products.nextPage
        ? `http://localhost:3000/api/products?page=${products.nextPage}`
        : null,
    });
  } else {
    res.json({ status: "error" });
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const prod = await getProdById(pid);
    prodByIdNotRecived(prod);
    res.json({ message: "Producto Encontrado", product: prod });
  } catch (error) {
    next(error);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const product = req.body; 
    checkRequiredProdProperties(product)
    const prod = await addProd(product);
    console.log("prod", prod);
    res.send({ message: "Producto agregado correctamente", product: prod });
  } catch (error) {
    next(error);
  }
};
export const updateProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const productToModify = req.body;
    checkRequiredProdProperties(productToModify)
    const prod = await updateProd(pid, productToModify);
    res.json({ message: "Producto actualizado correctamente", prod: prod });
  } catch (error) {
    next(error)
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const prodDeleted = await deleteProd(pid);
    prodByIdNotRecived(prodDeleted)
    res.send({ message: "Producto elimando correctamente", prod: prodDeleted });
  } catch (error) {
    next(error)
  }
};
