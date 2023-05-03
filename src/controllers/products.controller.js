import {
  getAllProds,
  addProd,
  getProdById,
  updateProd,
  deleteProd,
} from "../services/products.services.js";
import { recivedProdExists } from "../utils/errors/utils.js";


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

export const getProductById = async (req, res) => {
  const { pid } = req.params;
  try {
    const prod = await getProdById(pid);
    res.json({ message: "Producto Encontrado", product: prod });
  } catch (error) {
    
  }
};

export const addProduct = async (req, res) => {
  const product = req.body;
  recivedProdExists(product);
  try {
    await addProd(product);
    res.send({ message: "Producto agregado correctamente", product });
  } catch (error) {
    console.log(error);
  }
};
export const updateProduct = async (req, res) => {
  const { pid } = req.params;
  const productoAModificar = req.body;
  try {
    const productoExistente = await getProdById(pid);
    if (productoExistente == null) {
      CustomError.createCustomError({
        name: errorName.PRODUCT_ERROR,
        cuase: errorCause.WRONG_ID,
        message: errorMessage.PRODUCT_DATA_INCOMPLETE,
      });
    }
    const prod = await updateProd(pid, productoAModificar);
    res.json({ message: "Producto actualizado correctamente", prod: prod });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (req, res) => {
  const { pid } = req.params;
  try {
    const prodDeleted = await deleteProd(pid);
    res.send({ message: "Producto elimando correctamente", prod: prodDeleted });
  } catch (error) {
    console.log(error);
  }
};
