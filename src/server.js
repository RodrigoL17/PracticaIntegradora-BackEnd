import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import realtimeproductsRouter from "./routes/realtimeproducts.router.js";
import homeRouter from "./routes/home.router.js";
import chatRouter from "./routes/chat.router.js";
// import ProductManager from "./dao/fileManagers/productManager.js";
import ProductManager from "./dao/mongoManagers/productManager.js";
import ChatManager from "./dao/mongoManagers/chatManager.js";
import "./dao/dbConfig.js";

//creamos servidor
const app = express();
const PORT = 3000;

//para que codifique
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//para path absoluto
app.use(express.static(__dirname + "/public"));

//configurar handlebars

app.engine(".hbs", handlebars.engine({ extname: ".hbs" })); //configuracion exclusiva handlebars
app.set("views", __dirname + "/views");
app.set("view engine", ".hbs");

//rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/realtimeproducts", realtimeproductsRouter);
app.use("/home", homeRouter);
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
      chatManager.addMessage(info)
    }

    const lala = chatManager.getChat()
    console.log("lala", lala)
  });
  
  
  
  
});

