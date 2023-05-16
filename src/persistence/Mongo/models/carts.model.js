import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
    products: {
      type: [
        {
          pid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true
          },
          quantity: {
            type: Number,
            required: true
          }
        }
      ],
      default: []
    }
});

cartSchema.pre("findOne", function (next) {
  if (this.products && this.products.length > 0) {
    this.populate("products.pid");
  }
  next();
});

export const cartsModel = mongoose.model("carts", cartSchema);
