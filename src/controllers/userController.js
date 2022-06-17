const generateJWT = require('../utils/generateJWT');
const { User } = require('../database/models');

const userController = async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user != null) {
        return res.status(409).json({ message: 'User already registered' });
    }

    const newUser = await User.create({
        displayName,
        email,
        password,
        image,
    });

    const token = generateJWT({ data: newUser });
    return res.status(201).json({ token });
};

const getAllUsers = async (_req, res) => {
    const allUsers = await User.findAll({ attributes: { exclude: ['password'] } });
    return res.status(200).json(allUsers);
};

const getUserId = async (req, res) => {
    const { id } = req.params;
    const userId = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });

    if (!userId) {
        return res.status(404).json({ message: 'User does not exist' });
    }

    return res.status(200).json(userId);
};

module.exports = { userController, getAllUsers, getUserId };