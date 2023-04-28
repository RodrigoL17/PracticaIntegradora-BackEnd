import {faker} from "@faker-js/faker"

export const generateProduct =() => {
    const product = {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.random.alphaNumeric(10),
        price: faker.commerce.price(),
        status: faker.datatype.boolean(),
        stock: faker.random.numeric(3),
        category: faker.commerce.department(),
        thumbnail: faker.datatype.array(4)
    }
    return product
}

