import CustomError from "./customErrors.js";
import { errorCause, errorName, errorMessage } from "./EErrors.js";

export const checkPID = (pid) => {
    if (!pid) {
        CustomError.createCustomError({
          name: errorName.PRODUCT_ERROR,
          cause: errorCause.ERROR_ID,
          message: errorMessage.PRODUCT_DATA_INCOMPLETE,
        });
      }
}

export const recivedProdExists = (prod) => {
    if (!prod) {
        CustomError.createCustomError({
          name: errorName.PRODUCT_ERROR,
          cuase: errorCause.MISSING_PRODUCT,
          message: errorMessage.PRODUCT_DATA_INCOMPLETE,
        });
      }
}

export const checkCID = (cid) => {
  if (!cid) {
    CustomError.createCustomError({
      name: errorName.CART_ERROR,
      cause: errorCause.MISSING_ID_CART,
      message: errorMessage.CART_DATA_INCOMPLETE,
    });
  }
};

export const checkPIDforCart = (pid) => {
  if (!pid) {
    CustomError.createCustomError({
      name: errorName.CART_ERROR,
      cause: errorCause.ERROR_ID,
      message: errorMessage.PRODUCT_DATA_INCOMPLETE,
    });
  }
};
