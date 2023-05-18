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
import loggerTestRouter from "./routes/loggerTest.router.js";

import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";

import "./passport/passportStrategies.js";
import config from "./utils/Dotenv/config.js";
import { __dirname } from "./utils.js";
import { errorMiddleware } from "./utils/Errors/error.middleware.js";

//Server Config
const app = express();
const PORT = config.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//Handlebars config
app.set("views", __dirname + "/views");
app.set("view engine", ".hbs");
app.engine(
  ".hbs",
  handlebars.engine({
    extname: ".hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
      getFirstElement: Handlebars.helpers.getFirstElement,
    },
  })
);

//Handlebars helper
Handlebars.registerHelper("getFirstElement", function (array) {
  return array[0];
});

//Cookie config
app.use(cookieParser(config.COOKIE_KEY));

//Express-session config
app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      mongoUrl: config.MONGO_URI,
    }),
    cookie: { maxAge: 300000 },
  })
);

//Passport Config
//Initialize
app.use(passport.initialize());
app.use(passport.session()); //passport saves info in session

//Routes
app.use("/", sessionRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/views", viewsRouter);
app.use("/mockingproducts", mockingProductsRouter);
app.use("/loggerTest", loggerTestRouter);

//Use Error Middleware
// app.use(errorMiddleware)

const httpServer = app.listen(PORT, () => {
  console.log(`Escuchando puerto ${PORT}`);
});
