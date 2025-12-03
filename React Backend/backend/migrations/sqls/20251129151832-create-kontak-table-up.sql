CREATE TABLE kontak (
    id_telepon INT NOT NULL AUTO_INCREMENT,
    nomor_telepon VARCHAR(20) NOT NULL,
    tipe_telepon VARCHAR(50), /* Misal: WhatsApp, Rumah, Kantor */
    id_nasabah INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id_telepon),
    
    /* Membuat Relasi (Foreign Key) ke tabel Nasabah */
    CONSTRAINT fk_kontak_nasabah
    FOREIGN KEY (id_nasabah) REFERENCES nasabah(id_nasabah)
    ON DELETE CASCADE
);