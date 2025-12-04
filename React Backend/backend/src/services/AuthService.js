const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: autoBind } = require("auto-bind");

const AuthenticationError = require("../exceptions/AuthenticationError");
const InvariantError = require("../exceptions/InvariantError");
const { pool } = require("../utils/index");
const MailSender = require("../utils/MailSender"); 

class AuthService {
  constructor() {
    this.pool = pool;
    this.mailSender = new MailSender(); 
    autoBind(this);
  }

  async login({ email, password }) {
    console.log("Mencoba login untuk email:", email);
    
    const [rows] = await this.pool.query(
      `SELECT id_user, nama, email, password, peran, total_menghubungi FROM users WHERE email = ? LIMIT 1`,
      [email]
    );

    const user = rows[0];
    if (!user) {
      console.error("Pengguna tidak ditemukan.");
      throw new AuthenticationError("Email atau kata sandi salah");
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
        console.error("Password tidak cocok!"); 
        throw new AuthenticationError("Email atau kata sandi salah");
    }
    
    console.log("Login sukses! Password cocok."); 

    const payload = {
      id_user: user.id_user,
      nama: user.nama,
      peran: user.peran,
      scope: user.peran, 
    };

    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: `${process.env.ACCESS_TOKEN_AGE}s` }
    );

    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: `${process.env.REFRESH_TOKEN_AGE}s` }
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
    } catch {
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
    await this.pool.query(`DELETE FROM autentikasi WHERE id_user = ?`, [id_user]);
  }
 
  async verifyJwtRefresh(refreshToken) {
    try {
      return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch {
      throw new AuthenticationError(
        "Refresh token kadaluwarsa atau tidak valid"
      );
    }
  }
 
  async generateAccessToken(payload) {
    return jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: `${process.env.ACCESS_TOKEN_AGE}s` }
    );
  }

  
  async forgotPassword({ email }) {
   
    const [rows] = await this.pool.query(
      `SELECT id_user, email, nama FROM users WHERE email = ? LIMIT 1`,
      [email]
    );

    const user = rows[0];
    if (!user) throw new InvariantError("Email tidak terdaftar");

   
    const resetToken = jwt.sign(
      { id_user: user.id_user, email: user.email },
      process.env.RESET_SECRET,
      { expiresIn: "15m" }
    );

    
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

   
    console.log(`Mengirim email reset password ke: ${email}`);
    
    try {
        await this.mailSender.sendEmail(
            email, 
            "Permintaan Reset Password", 
            resetLink 
        );
        console.log("Email berhasil terkirim!");
    } catch (error) {
        console.error("Gagal mengirim email:", error);
        throw new InvariantError("Gagal mengirim email reset password. Pastikan konfigurasi SMTP benar.");
    }

    return { 
        message: "Link reset password telah dikirim ke email Anda. Silakan cek Inbox atau Spam." 
    };
  }

  async resetPassword({ token, newPassword }) {
    try {
      
      const decoded = jwt.verify(token, process.env.RESET_SECRET);

      
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      
      const [result] = await this.pool.query(
        `UPDATE users SET password = ? WHERE id_user = ?`,
        [hashedPassword, decoded.id_user]
      );

      if (result.affectedRows === 0) {
        throw new InvariantError("Pengguna tidak ditemukan");
      }

      return { id_user: decoded.id_user };
    } catch {
      throw new InvariantError(
        "Token reset tidak valid atau sudah kedaluwarsa"
      );
    }
  }
}

module.exports = AuthService;