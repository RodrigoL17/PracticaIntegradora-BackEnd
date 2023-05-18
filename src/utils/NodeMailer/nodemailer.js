import nodemailer from "nodemailer";
import config from "../Dotenv/config.js";

//Transporter config NodeMailer
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.GMAIL_USER,
    pass: config.GMAIL_PASSWORD,
  },
});
