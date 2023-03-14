import express from "express";
import Handlebars from "handlebars";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import chatRouter from "./routes/chat.router.js";
import sessionRouter from "./routes/session.router.js";
// import ProductManager from "./dao/fileManagers/productManager.js";
import ProductManager from "./dao/mongoManagers/productManager.js";
import ChatManager from "./dao/mongoManagers/chatManager.js";
import "./dao/dbConfig.js";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access"; 

//creamos servidor
const app = express();
const PORT = 3000;

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
  session({ secret: "secretKey", resave: false, saveUninitialized: true, 
  store: new MongoStore({mongoUrl:"mongodb+srv://cordo17:Graciana17@cluster0.o7ijfat.mongodb.net/E-commerce-backEnd?retryWrites=true&w=majority"})
 })
);

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
const socketServer = new Server(httpServer);

const productManager = new ProductManager();
const chatManager = new ChatManager();

const products = await productManager.getProducts();
const chat = await chatManager.getChat();

socketServer.on("connection", (socket) => {
  console.log("Usuario Conectado", socket.id);

  socket.emit("products", products);

  socket.on("newUser", (usuario) => {});

  socket.on("message", (info) => {
    if (chat.length === 0) {
      chatManager.createChat();
      chatManager.addMessage(info);
    } else {
      chatManager.addMessage(info);
    }

    const lala = chatManager.getChat();
    console.log("lala", lala);
  });
});
