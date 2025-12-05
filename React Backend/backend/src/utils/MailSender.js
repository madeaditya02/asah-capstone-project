
const nodemailer = require('nodemailer');

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, 
      family: 4,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  sendEmail(targetEmail, subject, content) {
    const message = {
      from: `Capstone App <${process.env.SMTP_USER}>`,
      to: targetEmail,
      subject: subject,
      text: content,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Reset Password</h2>
          <p>Halo,</p>
          <p>Anda menerima email ini karena ada permintaan reset password untuk akun Anda.</p>
          <p>Silakan klik tombol di bawah ini untuk mereset password Anda:</p>
          <a href="${content}" style="background-color: #0058D2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
          <p style="margin-top: 20px; font-size: 12px; color: gray;">
            Jika tombol tidak berfungsi, salin link ini: <br/> ${content}
          </p>
          <p>Link ini berlaku selama 15 menit.</p>
        </div>
      `,
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;