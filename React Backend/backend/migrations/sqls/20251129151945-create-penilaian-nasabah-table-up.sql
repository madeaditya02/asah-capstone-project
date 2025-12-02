CREATE TABLE penilaian_nasabah (
    id_penilaian INT NOT NULL AUTO_INCREMENT,
    probability DECIMAL(5, 2), /* Misal: 80.50% */
    prioritas VARCHAR(50), /* Misal: High, Medium, Low */
    id_nasabah INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id_penilaian),

    /* Relasi ke tabel Nasabah */
    CONSTRAINT fk_penilaian_nasabah
    FOREIGN KEY (id_nasabah) REFERENCES nasabah(id_nasabah)
    ON DELETE CASCADE
);