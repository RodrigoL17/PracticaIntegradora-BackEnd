import swaggerJSDoc from "swagger-jsdoc";
import {__dirname} from "../../utils.js"

console.log(`${__dirname}/Docs/CartDocs/**/*yaml`)
// Config swagger to use in SwaggerUI-express on server
const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentacion Ecommerce",
            version: "1.0.0"
        }
    },
    apis: [`${__dirname}/Docs/Carts/Carts.yaml`, `${__dirname}/Docs/Products/Products.yaml` ],
}


export const swaggerSetup = swaggerJSDoc(swaggerOptions)