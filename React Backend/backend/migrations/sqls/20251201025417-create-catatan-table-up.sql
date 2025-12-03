CREATE TABLE catatan (
  id_catatan VARCHAR(50) PRIMARY KEY,
  deskripsi_catatan TEXT NOT NULL,
  waktu_dihubungi DATETIME NOT NULL,
  durasi TIME NULL,

  id_nasabah INT NOT NULL,           
  id_user INT NOT NULL,            
  

  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,


  CONSTRAINT fk_catatan_nasabah 
    FOREIGN KEY (id_nasabah) REFERENCES nasabah(id_nasabah) 
    ON DELETE CASCADE,

  CONSTRAINT fk_catatan_user
    FOREIGN KEY (id_user) REFERENCES users(id_user) 
    ON DELETE CASCADE


);