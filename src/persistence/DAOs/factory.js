import config from "../../utils/Dotenv/config.js";
import ProductManagerMongo from "./productsDAOs/productManagerMongo.js";
import CartManagerMongo from "./cartDAOs/cartManagerMongo.js";
import UserManagerMongo from "./userDAOs/usersManagerMongo.js";
import TicketManagerMongo from "./ticketDAOs/ticketManagerMongo.js";

let productsDao;
let cartDao;
let userDao;
let ticketDao;

switch (config.PERSISTENCIA) {
  case "MONGO":
    await import("../Mongo/configMongo.js");
    productsDao = new ProductManagerMongo();
    cartDao = new CartManagerMongo();
    userDao = new UserManagerMongo();
    ticketDao = new TicketManagerMongo();
    break;
  case "FILE":
  default:
    break;
}

export { productsDao, cartDao, userDao, ticketDao };
