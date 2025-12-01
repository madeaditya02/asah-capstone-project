const AuthHandler = require('./handler');

module.exports = [
  {
    method: 'POST',
    path: '/auth/login',
    handler: AuthHandler.login,
    options: { auth: false }
  },
  {
    method: 'POST',
    path: '/auth/logout',
    handler: AuthHandler.logout,
  },
  {
    method: 'POST',
    path: '/auth/forgot-password',
    handler: AuthHandler.forgotPassword,
    options: { auth: false }
  },
  {
    method: 'POST',
    path: '/auth/reset-password',
    handler: AuthHandler.resetPassword,
    options: { auth: false }
  },
];
