const { Category } = require('../database/models');

const categoryController = async (req, res) => {
    const { name } = req.body;
    const addCategory = await Category.create({
        name,
    });

    return res.status(201).json(addCategory);
};

module.exports = { categoryController };