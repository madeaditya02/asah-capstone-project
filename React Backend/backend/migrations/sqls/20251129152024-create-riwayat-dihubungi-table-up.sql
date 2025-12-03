CREATE TABLE riwayat_dihubungi (
    id_riwayat INT NOT NULL AUTO_INCREMENT,
    
    /* Atribut sesuai ERD */
    total_dihubungi INT DEFAULT 0,
    total_dihubungi_periode_sebelumnya INT DEFAULT 0,
    hari_terakhir_dihubungi DATE,
    durasi_dihubungi INT, /* Dalam detik atau menit */
    channel VARCHAR(50), /* Call, WA, Email */
    hasil_campaign_sebelumnya VARCHAR(255),
    
    id_telepon INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id_riwayat),

    /* Relasi ke tabel Kontak */
    CONSTRAINT fk_riwayat_kontak
    FOREIGN KEY (id_telepon) REFERENCES kontak(id_telepon)
    ON DELETE CASCADE
);