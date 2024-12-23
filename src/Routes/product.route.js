import { createProduct, getProducts } from "../controllers/product.controller.js";
import express from "express"

const router = express.Router()
router.get('/getProduct', getProducts); 
router.post('/addProduct', createProduct); 

export default router;