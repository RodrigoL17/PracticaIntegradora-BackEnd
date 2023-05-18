import mongoose from "mongoose";
import { generateRandomString } from "../../../utils.js";

const ticketSchema = new mongoose.Schema({
    code:{
        type: String,
        default: generateRandomString(), // generate random string for code ticket 
        unique: true
    },
    purchase_datetime: Date,

    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }



});

export const ticketModel = mongoose.model("Ticket", ticketSchema);
