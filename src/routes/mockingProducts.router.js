import { Router } from "express";
import { generateProduct } from "../Utilities/Mocks/productMock.js";

const router = Router()

router.get("/", (req, res) => {
    const products = []
    for (let i = 0; i < 100; i++) {
        const prod = generateProduct()
        products.push(prod)
    }
    res.json({products: products})
})

export default router