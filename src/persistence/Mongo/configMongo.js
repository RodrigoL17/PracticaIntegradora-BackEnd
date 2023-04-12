//coniguracion de la base de datos mongo
import config from "../../config.js";
import mongoose from "mongoose";

const URI = config.MONGO_URI
  
mongoose.connect(URI, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Conectado con exito a la base de datos");
  }
});
