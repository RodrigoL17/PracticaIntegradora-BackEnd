//coniguracion de la base de datos mongo

import mongoose from "mongoose";

const URI = "mongodb+srv://cordo17:Graciana17@cluster0.o7ijfat.mongodb.net/E-commerce-backEnd?retryWrites=true&w=majority"

mongoose.connect(URI,(error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("Conectado con exito a la base de datos")
    }
})

