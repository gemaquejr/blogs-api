const generateJWT = require('../utils/generateJWT');
const { User } = require('../database/models');

const loginController = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) {
        return res.status(400).json({ message: 'Invalid fields' });
    }

    const token = generateJWT();
    return res.status(200).json({ token });
};

module.exports = { loginController };