import express from "express";
import Handlebars from "handlebars";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import swaggerUi from "swagger-ui-express";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import sessionRouter from "./routes/session.router.js";
import mockingProductsRouter from "./routes/mockingProducts.router.js";
import loggerTestRouter from "./routes/loggerTest.router.js";

import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";

import "./Utilities/Passport/passportStrategies.js";
import config from "./Utilities/Dotenv/config.js";
import { __dirname } from "./utils.js";
import { swaggerSetup } from "./Utilities/Swagger/swagger.js";
import { errorMiddleware } from "./Utilities/Errors/error.middleware.js";

//Server Config
const app = express();
const PORT = config.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//Handlebars helper
Handlebars.registerHelper("getFirstElement", function (array) {
  return array[0];
});


Handlebars.registerHelper('isEqual', function (value1, value2, options) {
  return value1 === value2 ? options.fn(this) : options.inverse(this);
});

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
      isEqual: Handlebars.helpers.isEqual,
    },
  })
);

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
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/session", sessionRouter);
app.use("/api/documentation", swaggerUi.serve, swaggerUi.setup(swaggerSetup)) // Swagger documentation endpoint
app.use("/mockingproducts", mockingProductsRouter); 
app.use("/loggerTest", loggerTestRouter); //Endpoint to test loggers

//Use Error Middleware
// app.use(errorMiddleware)

const httpServer = app.listen(PORT, () => {
  console.log(`Escuchando puerto ${PORT}`);
});
