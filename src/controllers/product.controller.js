import Category from "../Model/categories.modal.js";
import Product from "../Model/product.modal.js";

export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments();

    res.status(200).json({
      products,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(400).json({ message: "nahi aa raha" });
  }
};

// Add a new product
export const createProduct = async (req, res) => {
  try {
    const {
      product_name,
      categoryId,
      price,
      discount_price,
      image_url,
      description,
      stock,
    } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

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
    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(400).json({ message: "Product creation failed", error });
  }
};


// Update Product 
export const updateProduct = async (req, res) => {
    try {
        const {id} = req.params;

        const updateData = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });

        if(!updatedProduct){
            return res.status(404).json({
                message: "product not found"
            })
        }

        res.status(200).json({
            message: "product updated successfully",
            product: updatedProduct
        });

    } catch (error) {
        res.status(400).json({
            message: "Failed to update product",
            error: error.message
        })
    }
};
