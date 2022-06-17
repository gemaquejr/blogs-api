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

module.exports = { userController };