const mysql = require("mysql2/promise");
const ClientError = require("../exceptions/ClientError");
const AuthenticationError = require("../exceptions/AuthenticationError");

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});

const errorResponse = (error) => {
  if (error instanceof ClientError) {
    return {
      status: "fail",
      message: error.message,
    };
  }

  console.error(error);
  return {
    status: "error",
    message: "Internal server error",
  };
};

const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

//generate token jwt
const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new AuthenticationError("Invalid token");
  }
};

module.exports = {
  pool,
  errorResponse,
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
};
