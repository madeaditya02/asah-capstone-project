const routes = (handler) => [

  {
    method: "GET",
    path: "/profile/{id}",
    handler: handler.getProfileById,
    options: { auth: "jwt_strategy" },
  },

 
  {
    method: "GET",
    path: "/profiles",
    handler: handler.getAllProfiles,
    options: { auth: "jwt_strategy" },
  },

  {
    method: "PUT",
    path: "/profile/{id}",
    handler: handler.updateProfile,
    options: { auth: "jwt_strategy" },
  },


  {
    method: "DELETE",
    path: "/profile/{id}",
    handler: handler.deleteProfile,
    options: { auth: "jwt_strategy" },
  },
];

module.exports = routes;
