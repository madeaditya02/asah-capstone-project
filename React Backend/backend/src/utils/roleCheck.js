const AuthorizationError = require("../exceptions/AuthorizationError");


const onlyAdmin = (credentials) => {
  if (credentials.peran !== "admin") {
    throw new AuthorizationError("Akses khusus admin");
  }
};


const adminOrSelf = (credentials, targetId) => {
  if (credentials.peran === "admin") return;

  if (credentials.id_user !== Number(targetId)) {
    throw new AuthorizationError("Anda tidak memiliki izin");
  }
};

module.exports = { onlyAdmin, adminOrSelf };
