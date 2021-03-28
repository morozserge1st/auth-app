const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const BlackList = require('../models/BlackList');
const { validateData } = require('../utils/validations');

const { privateKey } = require('../config');

const generateToken = (data) => {
  const payload = {
    id: data.id,
  };

  const token = jwt.sign(payload, privateKey, { expiresIn: '24h' });

  return token;
};

const registration = async (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
    fullName: req.body.fullName,
  };

  const errors = await validateData(data);

  if (errors.length) {
    return res.status(400).json({ message: 'Invalid data', errors });
  }

  const candidate = await User.findOne(data);

  if (candidate) {
    return res.status(400).json({ message: 'User already exists' });
  }

  data.password = await bcrypt.hash(data.password, 10);

  const user = await User.create(data);

  res.json({
    message: 'Success',
    data: user,
  });
};

const login = async (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
  };

  const user = await User.findOne(data);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const isValidPassword = await bcrypt.compare(data.password, user.password);

  if (!isValidPassword) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  const token = generateToken(user);

  res.json({
    message: 'Success',
    token,
  });
};

const logout = async (req, res) => {
  const token = req.body.token;

  BlackList.add(token);

  res.json({
    message: 'Success',
  });
};

module.exports = {
  registration,
  login,
  logout,
};
