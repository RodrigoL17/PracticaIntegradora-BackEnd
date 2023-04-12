import express from "express";
import Handlebars from "handlebars";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { __dirname } from "./utils.js";
// import { Server } from "socket.io";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import chatRouter from "./routes/chat.router.js";
import sessionRouter from "./routes/session.router.js";
import "./persistence/Mongo/configMongo.js";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import passport from "passport";
import "./passport/passportStrategies.js"
import config from "./config.js";

//creamos servidor
const app = express();
const PORT = config.PORT;

//para que codifique
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//para path absoluto
app.use(express.static(__dirname + "/public"));

//configurar handlebars
app.engine(
  ".hbs",
  handlebars.engine({
    extname: ".hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
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
app.use("/chat", chatRouter);

const httpServer = app.listen(PORT, () => {
  console.log(`Escuchando puerto ${PORT}`);
});

//Socket del lado del servidor
// const socketServer = new Server(httpServer);

// const productManager = new ProductManager();
// const chatManager = new ChatManager();

// const products = await productManager.getProducts();
// const chat = await chatManager.getChat();

// socketServer.on("connection", (socket) => {
//   console.log("Usuario Conectado", socket.id);

//   socket.emit("products", products);

//   socket.on("newUser", (usuario) => {});

//   socket.on("message", (info) => {
//     if (chat.length === 0) {
//       chatManager.createChat();
//       chatManager.addMessage(info);
//     } else {
//       chatManager.addMessage(info);
//     }

//     const lala = chatManager.getChat();
//     console.log("lala", lala);
//   });
// });
