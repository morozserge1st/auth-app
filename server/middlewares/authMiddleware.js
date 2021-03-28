const jwt = require('jsonwebtoken');
const BlackList = require('../models/BlackList');

const { privateKey } = require('../config');

const authMiddleware = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  const tokenString = req.headers.authorization;
  let token;

  if (tokenString) {
    token = req.headers.authorization.split(' ')[1];
  }

  const isInBlackList = BlackList.find(token);

  if (!token || isInBlackList) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const data = jwt.verify(token, privateKey);

  req.user = data;
  next();
};

module.exports = authMiddleware;
