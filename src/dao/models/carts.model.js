import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  products: {
    type:Array,
    required: true
  }
});

export const cartsModel = mongoose.model("carts", cartSchema);
