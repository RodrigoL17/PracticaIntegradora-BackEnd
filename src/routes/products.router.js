import { Router } from "express";
// import ProductManager from "../dao/fileManagers/productManager.js";
import ProductManager from "../dao/mongoManagers/productManager.js";


const productManager = new ProductManager();

const router = Router();

router.get("/", async (req, res) => {
  const productos = await productManager.getProducts();
  const { limit } = req.query;
  if (parseInt(limit) > 0 || limit === undefined) {
    const mostrarProdcutos = productos.slice(0, limit);
    res.json(mostrarProdcutos);
  } else {
    res.json(productos);
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
