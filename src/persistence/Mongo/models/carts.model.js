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
  next();
});

export const cartsModel = mongoose.model("carts", cartSchema);
