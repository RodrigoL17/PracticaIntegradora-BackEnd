import {
  getAllProds,
  addProd,
  getProdById,
  updateProd,
  deleteProd,
} from "../services/products.services.js";

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
    const productoID = await getProdById(pid);
    res.json({ message: "Producto Encontrado", productoID });
  } catch (error) {
    res.json({ message: "Producto no encontrado" });
  }
};

export const addProduct = async (req, res) => {
  const product = req.body;
  await addProd(product);
  res.send({ message: "Producto agregado correctamente", product });
};
export const updateProduct = async (req, res) => {
  const { pid } = req.params;
  const productoAModificar = req.body;
  const productoExistente = await getProdById(pid);
  if (!productoExistente) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }
  const prod = await updateProd(pid, productoAModificar);
  res.json({ message: "Producto actualizado correctamente", prod: prod });
};

export const deleteProduct = async (req, res) => {
  const { pid } = req.params;
  const prodDeleted = await deleteProd(pid);
  res.send({ message: "Producto elimando correctamente", prod: prodDeleted });
};
