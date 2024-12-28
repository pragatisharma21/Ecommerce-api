import Category from "../Model/categories.modal.js";

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { category_name, description } = req.body;

    const newCategory = new Category({
      category_name,
      description,
    });

    await newCategory.save();
    res.status(201).json({ message: "Category created successfully", category: newCategory });
  } catch (error) {
    res.status(400).json({ message: "Failed to create category", error });
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (error) {
    res.status(400).json({ message: "Failed to fetch categories", error });
  }
};

// Update a category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_name, description } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { category_name, description },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category updated successfully", category: updatedCategory });
  } catch (error) {
    res.status(400).json({ message: "Failed to update category", error });
  }
};
