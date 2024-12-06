const jwt = require('jsonwebtoken');
const User = require('../models/User');

function authenticateToken(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }
  try {
    const decodedToken = jwt.verify(token, 'your-secret-key');
    req.user = { userId: decodedToken.userId, isAdmin: decodedToken.isAdmin };
    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: 'Invalid token' });
  }
}

module.exports = authenticateToken;
