const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const jwtConfig = {
    expiresIn: '15m',
    algorithm: 'HS256',
};

const generateJWT = (payload) => {
const token = jwt.sign({ data: payload }, JWT_SECRET, jwtConfig);

return token;
};

module.exports = generateJWT;