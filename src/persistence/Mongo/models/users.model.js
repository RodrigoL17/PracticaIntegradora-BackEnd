import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required:true,
    default: 0
  },
  password: {
    type: String,
    required: true,
  },
  isUser: {
    type: Boolean,
    required: true,
    default: true,
  },
  isAdmin: {
    type:Boolean,
    required: true,
    default: false,
  },
  isPremium: {
    type:Boolean,
    required: true,
    default: false,
  },
  last_login: {
    type: Date,
    default: null,
  }
});

export const userModel = mongoose.model("User", usersSchema);
