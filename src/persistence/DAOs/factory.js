import config from "../../config.js";
import ProductManagerMongo from "./productsDAOs/productManagerMongo.js";
import ProductManagerFS from "./productsDAOs/productManagerFS.js";
import CartManagerMongo from "./cartDAOs/cartManagerMongo.js";
import CartManagerFS from "./cartDAOs/cartManagerFs.js";
import UserManagerMongo from "./userDAOs/usersManagerMongo.js"
// import UserManagerFS from "./userDAOs/usersManagerFS.js";
import TicketManagerMongo from "./ticketDAOs/ticketManagerMongo.js";

let productsDao;
let cartDao;
let userDao;
let ticketDao;

switch (config.PERSISTENCIA) {
    case "MONGO": 
        await import ("../Mongo/configMongo.js")
        productsDao = new ProductManagerMongo()
        cartDao = new CartManagerMongo()
        userDao = new UserManagerMongo()
        ticketDao = new TicketManagerMongo()
        break;
    case "FILE": 
        productsDao = new ProductManagerFS()
        cartDao = new CartManagerFS()
        // userDao = new UserManagerFS()
    default:
        break;
}


export {productsDao, cartDao, userDao, ticketDao};