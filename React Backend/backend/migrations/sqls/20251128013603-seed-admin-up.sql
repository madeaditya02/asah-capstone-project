INSERT INTO users (nama, email, password, peran, total_menghubungi)
VALUES (
  'Admin Utama',
  'admin@example.com',
  '$2b$10$N9qo8uLOickgx2ZMRZo5e.e8BD0EUdPSU/EYEVpIpVrVvJ.FPE9W',
  'admin',
  null
)
ON DUPLICATE KEY UPDATE email = email;
