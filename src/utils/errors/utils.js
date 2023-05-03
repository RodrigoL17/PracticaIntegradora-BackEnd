import CustomError from "./customErrors.js";
// import { errorCause, errorName, errorMessage } from "./EErrors.js";

export const errorName = {
  PRODUCT_ERROR: "PRODUCT ERROR",
  CART_ERROR: "CART ERROR",
};

export const errorMessage = {
  PRODUCT_DATA_INCOMPLETE: "Invalid or missing Product Data",
  CART_DATA_INCOMPLETE: "Invalid or missing Cart Data",
};

export const errorCause = {
  INVALID_AND_MISSING_PROD_ID: "Invalid or missing ID property of Product",
  INVALID_AND_MISSING_CART_ID: "Invalid or missing ID property of Cart",
  INVALID_OR_MISSING_QUANTITY: "Invalid or missing quantity property of Product",
};

const genereateProductMissingInfo = (prod) => {
  return `One or more properties were incomplete or not valid.
  List of Required Products Properties:
  * title: [string], received ${prod.title}.
  * description: [string], received ${prod.description}.
  * code: [string][unique], received ${prod.code}.
  * price: [number], received ${prod.price}.
  * status: [boolean], received ${prod.status}.
  * stock: [number], received ${prod.stock}.
  * category: [string], received ${prod.category}.`;
};

export const checkExistsProd = (prod) => {
  if (Object.entries(prod).length === 0) {
    CustomError.createCustomError({
      name: errorName.CART_ERROR,
      cause: genereateProductMissingInfo(prod),
      message: errorMessage.PRODUCT_DATA_INCOMPLETE,
    });
  }
};

export const checkRequiredProdProperties = (prod) => {
  const { title, description, code, price, status, stock, category } = prod;
  if (
    !title ||
    !description ||
    !code ||
    !price ||
    !status ||
    !stock ||
    !category
  ) {
    CustomError.createCustomError({
      name: errorName.PRODUCT_ERROR,
      cause: genereateProductMissingInfo(prod),
      message: errorMessage.PRODUCT_DATA_INCOMPLETE,
    });
  }
};

export const prodByIdNotRecived = (prod) => {
  if (prod == null) {
    CustomError.createCustomError({
      name: errorName.PRODUCT_ERROR,
      cause: errorCause.INVALID_AND_MISSING_PROD_ID,
      message: errorMessage.PRODUCT_DATA_INCOMPLETE,
    });
  }
};

export const cartByIdNotRecived = (cart) => {
  if (cart == null) {
    CustomError.createCustomError({
      name: errorName.CART_ERROR,
      cause: errorCause.INVALID_AND_MISSING_CART_ID,
      message: errorMessage.CART_DATA_INCOMPLETE,
    });
  }
};

export const checkQuantityToUpdateCartProducts = (quantity) => {
  if (!quantity || typeof quantity !== "number") {
    CustomError.createCustomError({
      name: errorName.CART_ERROR,
      cause: errorCause.INVALID_OR_MISSING_QUANTITY,
      message: errorMessage.PRODUCT_DATA_INCOMPLETE,
    });
  }
};
