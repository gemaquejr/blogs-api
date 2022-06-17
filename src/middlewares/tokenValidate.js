const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const authToken = (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
      }
      
      const decoded = jwt.verify(token, JWT_SECRET);

      if (!decoded) {
          return res.status(401).json({ message: 'Expired or invalid token' });
        }
    };
module.exports = { authToken };