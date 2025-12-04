const AuthorizationError = require("../exceptions/AuthorizationError");


const onlyAdmin = (credentials = {}) => {
  if (!credentials || !credentials.peran) {
    throw new AuthorizationError("Token tidak valid");
  }

  if (credentials.peran !== "admin") {
    throw new AuthorizationError("Akses khusus admin");
  }
};

const adminOrSelf = (credentials = {}, targetId) => {
  if (!credentials || !credentials.id_user || !credentials.peran) {
    throw new AuthorizationError("Token tidak valid");
  }

  if (credentials.peran === "admin") return;

  if (credentials.id_user !== Number(targetId)) {
    throw new AuthorizationError("Anda tidak memiliki izin");
  }
};

module.exports = { onlyAdmin, adminOrSelf };
