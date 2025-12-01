const ClientError = require('../exceptions/ClientError');
const AuthenticationError = require('../exceptions/AuthenticationError');
const AuthorizationError = require('../exceptions/AuthorizationError');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');


const errorResponse = (error) => {
  if (error instanceof ClientError) {
    return {
      status: 'fail',
      message: error.message,
    };
  }


  console.error(error);
  return {
    status: 'error',
    message: 'Internal server error',
  };
};


const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

//generate token jwt
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new AuthenticationError('Invalid token');
  }
};

module.exports = {
  errorResponse,
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
};
