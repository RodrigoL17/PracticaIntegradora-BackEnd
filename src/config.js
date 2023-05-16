import dotenv from "dotenv";

dotenv.config();

export default {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET : process.env.GITHUB_CLIENT_SECRET,
    PERSISTENCIA: process.argv[2] || process.env.PERSISTENCIA, 
    ENVIROMENT: process.env.ENV,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
    GMAIL_USER: process.env.GMAIL_USER,
    JWT_SECRET: process.env.JWT_SECRET
}