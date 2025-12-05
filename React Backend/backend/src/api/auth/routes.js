const routes = (handler) => [
  {
    method: "POST",
    path: "/auth/login",
    handler: handler.login,
    options: { auth: false },
  },
  {
    method: "POST",
    path: "/auth/refresh",
    handler: handler.refreshToken,
    options: { auth: false },
  },
  {
    method: "POST",
    path: "/auth/forgot-password",
    handler: handler.forgotPassword,
    options: { auth: false },
  },
  {
    method: "POST",
    path: "/auth/reset-password",
    handler: handler.resetPassword,
    options: { auth: false },
  },
  {
    method: "POST",
    path: "/auth/logout",
    handler: handler.logout,
  },
  {
    method: "POST",
    path: "/auth/logout-all",
    handler: handler.logoutAll,
  },
];

module.exports = routes;
