const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const jwtConfig = {
    expiresIn: '30d',
    algorithm: 'HS256',
};

const generateJWT = (user) => {
const token = jwt.sign({ user }, JWT_SECRET, jwtConfig);

return token;
};

module.exports = generateJWT;