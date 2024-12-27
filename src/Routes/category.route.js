import express from "express";
import { createCategory, getCategories, updateCategory } from "../controllers/category.controller.js";

const router = express.Router();

router.post("/addCategory", createCategory); 
router.get("/getCategories", getCategories); 
router.put("/updateCategory/:id", updateCategory);

export default router;
