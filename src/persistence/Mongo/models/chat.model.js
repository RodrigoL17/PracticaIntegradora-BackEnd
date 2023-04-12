import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  messages: {
    type: Array,
  },
});

export const chatModel = mongoose.model("chat", chatSchema);
