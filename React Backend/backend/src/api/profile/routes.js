const routes = (handler) => [

  {
    method: "GET",
    path: "/profile/{id}",
    handler: handler.getProfileById,
  },

  {
    method: "GET",
    path: "/profiles",
    handler: handler.getAllProfiles,
  },

  {
    method: "PUT",
    path: "/profile/{id}",
    handler: handler.updateProfile,
  },

  {
    method: "DELETE",
    path: "/profile/{id}",
    handler: handler.deleteProfile,
  },

];

module.exports = routes;
