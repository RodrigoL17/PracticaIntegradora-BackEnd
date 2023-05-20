import swaggerJSDoc from "swagger-jsdoc";
import {__dirname} from "../../utils.js"

// Config swagger to use in SwaggerUI-express on server
const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentacion Ecommerce",
            version: "1.0.0"
        }
    },
    apis: [`${__dirname}/Docs/CartDocs/**/*yaml`, `${__dirname}/Docs/ProductsDocs/**/*yaml`],
}

export const swaggerSetup = swaggerJSDoc(swaggerOptions)