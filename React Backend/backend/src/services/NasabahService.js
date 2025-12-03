const pool = require('../utils/index');
const NotFoundError = require('../exceptions/NotFoundError');

class NasabahService {

  async getNasabah({ prioritas, status, search }) {
    let query = `
      SELECT 
        n.id_nasabah, 
        n.nama_nasabah, 
        n.pekerjaan, 
        pn.probability, 
        pn.prioritas,
        
        -- SUBQUERY: Ambil status dari catatan PALING BARU saja
        -- Ini mencegah data nasabah muncul berulang kali
        (
            SELECT s.nama_status 
            FROM catatan c
            JOIN status s ON c.id_status = s.id_status
            WHERE c.id_nasabah = n.id_nasabah
            ORDER BY c.created_at DESC
            LIMIT 1
        ) as status_terakhir

      FROM nasabah n
      LEFT JOIN penilaian_nasabah pn ON n.id_nasabah = pn.id_nasabah
    `;

    const values = [];
    const conditions = [];

    // Filter Prioritas 
    if (prioritas) {
      conditions.push(`pn.prioritas = ?`);
      values.push(prioritas);
    }

    // Search Nama
    if (search) {
      conditions.push(`n.nama_nasabah LIKE ?`);
      values.push(`%${search}%`);
    }

   
    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    if (status) {
      query += ` HAVING status_terakhir = ?`;
      values.push(status);
    }

    // Prioritas tertinggi di atas
    query += ` ORDER BY pn.probability DESC`;
    
    const [rows] = await pool.execute(query, values);
    
    // status_terakhir jadi status
    const mappedRows = rows.map(row => ({
        id_nasabah: row.id_nasabah,
        nama_nasabah: row.nama_nasabah,
        pekerjaan: row.pekerjaan,
        probability: row.probability,
        prioritas: row.prioritas,
        status: row.status_terakhir || 'Belum Ada Status'
    }));

    return mappedRows;
  }


  async getNasabahById(id) {
    // Query Data Diri & Penilaian
    const queryNasabah = `
      SELECT 
        n.*, 
        pn.probability, pn.prioritas, pn.id_penilaian
      FROM nasabah n
      LEFT JOIN penilaian_nasabah pn ON n.id_nasabah = pn.id_nasabah
      WHERE n.id_nasabah = ?
    `;

    const [rows] = await pool.execute(queryNasabah, [id]);

    if (rows.length === 0) {
      throw new NotFoundError('Nasabah tidak ditemukan');
    }

    const nasabahData = rows[0];

    // Query Kontak & Riwayat Dihubungi
    const queryKontakRiwayat = `
      SELECT 
        k.id_telepon, k.nomor_telepon, k.tipe_telepon,
        r.id_riwayat, r.total_dihubungi, r.hari_terakhir_dihubungi, 
        r.durasi_dihubungi, r.channel, r.hasil_campaign_sebelumnya
      FROM kontak k
      LEFT JOIN riwayat_dihubungi r ON k.id_telepon = r.id_telepon
      WHERE k.id_nasabah = ?
    `;
    
    const [kontakRows] = await pool.execute(queryKontakRiwayat, [id]);

   
    const kontakList = kontakRows.map((row) => ({
      id_telepon: row.id_telepon,
      nomor_telepon: row.nomor_telepon,
      tipe_telepon: row.tipe_telepon,
      riwayat: {
        id_riwayat: row.id_riwayat || null,
        total_dihubungi: row.total_dihubungi || 0,
        hari_terakhir_dihubungi: row.hari_terakhir_dihubungi,
        durasi: row.durasi_dihubungi,
        channel: row.channel,
        hasil_sebelumnya: row.hasil_campaign_sebelumnya
      }
    }));

    const queryCatatan = `
      SELECT 
        c.id_catatan, 
        c.deskripsi_catatan as deskripsi, 
        c.waktu_dihubungi,
        c.created_at, 
        u.nama as penulis,                
        s.nama_status                     
      FROM catatan c
      LEFT JOIN users u ON c.id_user = u.id_user
      LEFT JOIN status s ON c.id_status = s.id_status
      WHERE c.id_nasabah = ?
      ORDER BY c.created_at DESC
    `;
    
    const [catatanRows] = await pool.execute(queryCatatan, [id]);

    // Return Hasil 
    return {
      ...nasabahData,
      list_kontak: kontakList,
      list_catatan: catatanRows, 
    };
  }
}

module.exports = NasabahService;