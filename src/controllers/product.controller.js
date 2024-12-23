import Product from "../Model/product.modal.js";



export const getProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; 

        const products = await Product.find()
            .skip((page - 1) * limit) 
            .limit(Number(limit)); 

        const total = await Product.countDocuments(); 

        res.status(200).json({
            products,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / limit),
        }); // Send paginated response
    } catch (error) {
        res.status(400).json({ message: "nahi aa raha" }); // Handle errors
    }
};


// Add a new product
export const createProduct = async (req, res) => {
    try {
        const { product_name, categoryId, price, discount_price, image_url, description, stock } = req.body;

        const newProduct = new Product({
            product_name,
            categoryId,
            price,
            discount_price,
            image_url,
            description,
            stock,
        });

        await newProduct.save();
        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        res.status(400).json({ message: "Product creation failed", error }); 
    }
};
