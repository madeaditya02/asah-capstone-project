CREATE TABLE nasabah (

    id_nasabah INT NOT NULL AUTO_INCREMENT,
   
    nama_nasabah VARCHAR(255) NOT NULL,
    pekerjaan VARCHAR(100),
    pendidikan_terakhir VARCHAR(100),
    status_pernikahan VARCHAR(50),
  
    usia INT,
       
    pinjaman_pribadi BOOLEAN DEFAULT FALSE,
   
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id_nasabah)
);