ALTER TABLE catatan 
ADD COLUMN id_status VARCHAR(50) NULL,
ADD CONSTRAINT fk_catatan_status
FOREIGN KEY (id_status) REFERENCES status(id_status)
ON DELETE SET NULL; 