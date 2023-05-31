import prodService from "../services/products.services.js";
import {
  checkRequiredProdProperties,
  prodByIdNotRecived,
} from "../Utilities/Errors/utils.js";

//falta revisar
 const getAll = async (req, res) => {
  const { limit = 10, page = 1, sort, ...query } = req.query;
  const products = await prodService.getAll(limit, page, sort, query);
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
    res.json({ status: "error" }); //----> especialmete aca
  }
};

 const getById = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const prod = await prodService.getById(pid);
    prodByIdNotRecived(prod);
    //falta revisar si es necesario
    res.json({ message: "Producto Encontrado", product: prod });
  } catch (error) {
    next(error);
  }
};

 const create = async (req, res, next) => {
  try {
    const product = req.body;
    checkRequiredProdProperties(product);
    const prod = await prodService.create(product);
    //falta revisar si es necesario
    res.send({ message: "Producto agregado correctamente", product: prod });
  } catch (error) {
    console.log(error);
  }
};
 const update = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const productToModify = req.body;
    checkRequiredProdProperties(productToModify);
    const prod = await prodService.update(pid, productToModify);
    //falta revisar si es necesario
    res.json({ message: "Producto actualizado correctamente", prod: prod });
  } catch (error) {
    next(error);
  }
};

 const remove = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const prodDeleted = await prodService.remove(pid);
    prodByIdNotRecived(prodDeleted);
    res.setHeader("X-Message", "Producto eliminado correctamente");
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};


export default  {getAll, getById, create, update, remove}