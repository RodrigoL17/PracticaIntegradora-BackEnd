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
            ref: 'Product',
            required: true,
          },
          quantity: {
            type: Number,
            required: true
          },
          _id: false
        }
      ],
      default: []
    }
});

cartSchema.pre("findOne", function (next) {
    this.populate("products.pid");
    this.populate("userId");
  next();
});

export const cartsModel = mongoose.model("carts", cartSchema);
