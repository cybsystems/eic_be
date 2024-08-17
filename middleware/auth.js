const jwt = require('jsonwebtoken');
const { UserTable } = require('../models');

const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, "ntseic", async (err, user) => {
    if (err) return res.status(403).json({ message: 'Token is not valid' });
    console.log(user)
    try {
      const foundUser = await UserTable.findByPk(user.id);
      if (!foundUser) return res.status(404).json({ message: 'User not found' });
      req.user = foundUser.dataValues;
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

module.exports = authenticateToken;
