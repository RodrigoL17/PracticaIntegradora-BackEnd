import { Router } from "express";
// import ProductManager from "../dao/fileManagers/productManager.js";
import ProductManager from "../dao/mongoManagers/productManager.js";

const productManager = new ProductManager();

const router = Router();

router.get("/", async (req, res) => {
  const { limit = 10, page = 1, sort, ...query } = req.query;
  const products = await productManager.getProducts(limit, page, sort, query);
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
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const productoID = await productManager.getProdutcById(pid);
  if (productoID) {
    res.json({ massage: "Producto Encontrado", productoID });
  } else {
    res.json({ massage: "Producto no encontrado" });
  }
});

router.post("/", async (req, res) => {
  const product = req.body;
  await productManager.addProduct(product);
  res.send({ message: "Producto agregado correctamente", product });
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const productoAModificar = req.body;
  await productManager.updateProduct(pid, productoAModificar);
  res.send({ message: "Producto actualizado correctamente" });
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  await productManager.deleteProduct(pid);
  res.send({ message: "Producto elimando correctamente" });
});

export default router;
