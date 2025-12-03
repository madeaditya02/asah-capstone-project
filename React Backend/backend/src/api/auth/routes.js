const routes = (handler) => [


  {
    method: "POST",
    path: "/auth/login",
    handler: handler.login,
  },

  {
    method: "POST",
    path: "/auth/refresh",
    handler: handler.refreshToken,
  },

  {
    method: "POST",
    path: "/auth/forgot-password",
    handler: handler.forgotPassword,
  },

  {
    method: "POST",
    path: "/auth/reset-password",
    handler: handler.resetPassword,
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
