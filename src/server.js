import express from "express";
import Handlebars from "handlebars";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import sessionRouter from "./routes/session.router.js";
import mockingProductsRouter from "./routes/mockingProducts.router.js";
import loggerTestRouter from "./routes/loggerTest.router.js"

import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";

import "./passport/passportStrategies.js"
import config from "./config.js";
import { __dirname } from "./utils.js";
import { errorMiddleware } from "./utils/errors/error.middleware.js";


//creamos servidor
const app = express();
const PORT = config.PORT;

//para que codifique
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//para path absoluto
app.use(express.static(__dirname + "/public"));

//configurar handlebars
Handlebars.registerHelper('getFirstElement', function(array) {
  return array[0];
});

app.engine(
  ".hbs",
  handlebars.engine({
    extname: ".hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers:{
      getFirstElement:Handlebars.helpers.getFirstElement
    }
  })
  ); //configuracion exclusiva handlebars
  app.set("views", __dirname + "/views");
  app.set("view engine", ".hbs");
  
  //Cookie
  app.use(cookieParser());

//Configuracion express-session
app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      mongoUrl: config.MONGO_URI,
    }),
    cookie: {maxAge:300000}
  })
); 

//Passport
//inicializar
app.use(passport.initialize())
//passport va a guardar la informacion de session
app.use(passport.session())




//rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", sessionRouter);
app.use("/views", viewsRouter);
app.use("/mockingproducts", mockingProductsRouter);
app.use("/loggerTest", loggerTestRouter);

// app.use(errorMiddleware)

const httpServer = app.listen(PORT, () => {
  console.log(`Escuchando puerto ${PORT}`);
});

