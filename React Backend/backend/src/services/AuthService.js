const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthenticationError = require('../exceptions/AuthenticationError');
const InvariantError = require('../exceptions/InvariantError');

let pool;

const getPool = () => {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'bank_sales',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }
  return pool;
};

const AuthService = {

  // LOGIN
 
  login: async ({ email, password }) => {
    const db = getPool();


    const [rows] = await db.query(
      `SELECT id_user, nama, email, password, peran, total_menghubungi
       FROM users 
       WHERE email = ? 
       LIMIT 1`,
      [email],
    );

    const user = rows[0];

    if (!user) {
      throw new AuthenticationError('Email atau kata sandi salah');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AuthenticationError('Email atau kata sandi salah');
    }

  
    const tokenPayload = {
      id_user: user.id_user,
      nama: user.nama,
      peran: user.peran,
    };

    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET || 'jwt_super_secret_key',
      { expiresIn: '1d' },
    );

    return {
      token,
      user: {
        id_user: user.id_user,
        nama: user.nama,
        email: user.email,
        peran: user.peran,
        total_menghubungi: user.total_menghubungi,
      },
    };
  },

 
  // FORGOT PASSWORD
  
  forgotPassword: async ({ email }) => {
    const db = getPool();

    const [rows] = await db.query(
      `SELECT id_user, email 
       FROM users 
       WHERE email = ? 
       LIMIT 1`,
      [email],
    );

    const user = rows[0];
    if (!user) {
      throw new InvariantError('Email tidak terdaftar');
    }

    const resetToken = jwt.sign(
      { id_user: user.id_user, email: user.email },
      process.env.RESET_SECRET || 'reset_password_secret_key',
      { expiresIn: '15m' },
    );

    return {
      resetToken,
      resetLink: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`,
    };
  },

  
  // RESET PASSWORD

  resetPassword: async ({ token, newPassword }) => {
    try {
      const decoded = jwt.verify(
        token,
        process.env.RESET_SECRET || 'reset_password_secret_key',
      );

      const db = getPool();

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const [result] = await db.query(
        `UPDATE users 
         SET password = ? 
         WHERE id_user = ?`,
        [hashedPassword, decoded.id_user],
      );

      if (result.affectedRows === 0) {
        throw new InvariantError('Pengguna tidak ditemukan atau kata sandi gagal diubah');
      }

      return {
        id_user: decoded.id_user,
      };
    } catch (error) {
      throw new InvariantError('Token reset tidak valid atau sudah kedaluwarsa');
    }
  },
};

module.exports = AuthService;
