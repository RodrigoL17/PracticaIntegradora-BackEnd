import prodService from "../services/products.services.js";
import userService from "../services/user.services.js";
import {
  checkRequiredProdProperties,
  prodByIdNotRecived,
} from "../Utilities/Errors/utils.js";
import { generateRandomString } from "../utils.js";
import { transporter } from "../Utilities/NodeMailer/nodemailer.js";


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
    res.json({ status: "error" });
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
    console.log(req.body);
    const product = req.body;
    const { owner } = product;
    const user = await userService.getById(owner);
    if (user.isAdmin) {
      const newProduct = {
        ...product,
        code: generateRandomString(),
        owner: "admin",
      };
      checkRequiredProdProperties(newProduct);
      await prodService.create(newProduct);
      res.setHeader("X-Message", "Producto creado correctamente");
      res.sendStatus(204);
    }
    const newProduct = { ...product, code: generateRandomString() };
    checkRequiredProdProperties(newProduct);
    await prodService.create(newProduct);
    res.setHeader("X-Message", "Producto creado correctamente");
    res.sendStatus(204);
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
    const prod = await prodService.getById(pid);
    prodByIdNotRecived(prod);
    const user = await userService.getById(prod.owner);
    const prodDeleted = await prodService.remove(pid);
    res.setHeader("X-Message", "Producto eliminado correctamente");
    res.sendStatus(204);
    if (prodDeleted) {
      await transporter.sendMail({
        from: "ECOMMERCE",
        to: user.email,
        subject: `Your Product has been deleted`,
        text: `The product "${prod.title}" has been deleted succesfully from the e-commerce store.`,
      });
    }
  } catch (error) {
    next(error);
  }
};

export default { getAll, getById, create, update, remove };
