const { Category } = require('../database/models');

const categoryController = async (req, res) => {
    const { name } = req.body;
    const addCategory = await Category.create({
        name,
    });

    return res.status(201).json(addCategory);
};

const getAllCategories = async (_req, res) => {
    const allCategories = await Category.findAll();
    return res.status(200).json(allCategories);
};

module.exports = { categoryController, getAllCategories };