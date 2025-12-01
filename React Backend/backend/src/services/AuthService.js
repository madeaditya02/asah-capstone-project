const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AuthenticationError = require("../exceptions/AuthenticationError");
const InvariantError = require("../exceptions/InvariantError");
const { default: autoBind } = require("auto-bind");
const { pool } = require("../utils/index");

class AuthService {
  constructor() {
    this.pool = pool;
    autoBind(this);
  }

  
  async login({ email, password }) {
    const [rows] = await this.pool.query(
      `SELECT id_user, nama, email, password, peran, total_menghubungi
       FROM users 
       WHERE email = ? 
       LIMIT 1`,
      [email]
    );

    const user = rows[0];

    if (!user) {
      throw new AuthenticationError("Email atau kata sandi salah");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AuthenticationError("Email atau kata sandi salah");
    }

    const payload = {
      id_user: user.id_user,
      nama: user.nama,
      peran: user.peran,
    };

    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET || "jwt_super_secret_key",
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET || "jwt_refresh_secret_key",
      { expiresIn: "7d" }
    );

    
    await this.createRefreshToken({
      id_user: user.id_user,
      token: refreshToken,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id_user: user.id_user,
        nama: user.nama,
        email: user.email,
        peran: user.peran,
        total_menghubungi: user.total_menghubungi,
      },
    };
  }

 
  async createRefreshToken({ id_user, token }) {
    try {
      await this.pool.query(
        `INSERT INTO autentikasi (id_user, token) VALUES (?, ?)`,
        [id_user, token]
      );
    } catch (error) {
      throw new InvariantError("Gagal menyimpan refresh token");
    }
  }

  
  async verifyRefreshToken(token) {
    const [rows] = await this.pool.query(
      `SELECT id_user FROM autentikasi WHERE token = ? LIMIT 1`,
      [token]
    );

    if (rows.length === 0) {
      throw new AuthenticationError("Refresh token tidak valid");
    }

    return rows[0].id_user;
  }

 
  async deleteRefreshToken(token) {
    await this.pool.query(`DELETE FROM autentikasi WHERE token = ?`, [token]);
  }


  async deleteAllRefreshTokenByUser(id_user) {
    await this.pool.query(`DELETE FROM autentikasi WHERE id_user = ?`, [
      id_user,
    ]);
  }

 

  async verifyJwtRefresh(refreshToken) {
    try {
      return jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET || "jwt_refresh_secret_key"
      );
    } catch (err) {
      throw new AuthenticationError("Refresh token kadaluwarsa atau tidak valid");
    }
  }

 
  async generateAccessToken(payload) {
    return jwt.sign(
      payload,
      process.env.JWT_SECRET || "jwt_super_secret_key",
      { expiresIn: "15m" }
    );
  }

  

  async forgotPassword({ email }) {
    const [rows] = await this.pool.query(
      `SELECT id_user, email 
       FROM users 
       WHERE email = ? 
       LIMIT 1`,
      [email]
    );

    const user = rows[0];
    if (!user) {
      throw new InvariantError("Email tidak terdaftar");
    }

    const resetToken = jwt.sign(
      { id_user: user.id_user, email: user.email },
      process.env.RESET_SECRET || "reset_password_secret_key",
      { expiresIn: "15m" }
    );

    return {
      resetToken,
      resetLink: `${
        process.env.FRONTEND_URL || "http://localhost:5173"
      }/reset-password?token=${resetToken}`,
    };
  }

  async resetPassword({ token, newPassword }) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.RESET_SECRET || "reset_password_secret_key"
      );

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const [result] = await this.pool.query(
        `UPDATE users 
         SET password = ? 
         WHERE id_user = ?`,
        [hashedPassword, decoded.id_user]
      );

      if (result.affectedRows === 0) {
        throw new InvariantError(
          "Pengguna tidak ditemukan atau kata sandi gagal diubah"
        );
      }

      return {
        id_user: decoded.id_user,
      };
    } catch (error) {
      throw new InvariantError(
        "Token reset tidak valid atau sudah kedaluwarsa"
      );
    }
  }
}

module.exports = AuthService;
