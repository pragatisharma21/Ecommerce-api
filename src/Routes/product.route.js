import { createProduct, getProducts, updateProduct } from "../controllers/product.controller.js";
import express from "express"

const router = express.Router()
router.get('/getProduct', getProducts); 
router.post('/addProduct', createProduct); 
router.put('/updateProduct/:id', updateProduct);


export default router;