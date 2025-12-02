const pool = require('../utils/index'); 
const NotFoundError = require('../exceptions/NotFoundError');

class NasabahService {
  
  async getNasabah({ prioritas, status, search }) {
    let query = `
      SELECT DISTINCT
        n.id_nasabah, n.nama_nasabah, n.pekerjaan,
        pn.probability, pn.prioritas,
        s.nama_status as status
      FROM nasabah n
      LEFT JOIN penilaian_nasabah pn ON n.id_nasabah = pn.id_nasabah
      
      -- JOIN untuk mengambil status (via catatan)
      LEFT JOIN catatan c ON n.id_nasabah = c.id_nasabah
      LEFT JOIN status s ON c.id_status = s.id_status
    `;

    const values = [];
    const conditions = [];

    //Filter Prioritas
    if (prioritas) {
      conditions.push(`pn.prioritas = ?`);
      values.push(prioritas);
    }

    //Filter Status
    if (status) {
      conditions.push(`s.nama_status = ?`);
      values.push(status);
    }

    //Search Nama
    if (search) {
      conditions.push(`n.nama_nasabah LIKE ?`);
      values.push(`%${search}%`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    query += ` ORDER BY pn.probability DESC`;
    
    const [rows] = await pool.execute(query, values);
    return rows;
  }

  
  async getNasabahById(id) {
    // Ambil Data Nasabah
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

    // Ambil Data Kontak & Riwayat
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
        id_riwayat: row.id_riwayat,
        total_dihubungi: row.total_dihubungi,
        hari_terakhir_dihubungi: row.hari_terakhir_dihubungi,
        durasi: row.durasi_dihubungi,
        channel: row.channel,
        hasil_sebelumnya: row.hasil_campaign_sebelumnya
      }
    }));

    // Ambil catatan dan status (tapi pastiin tabel catatan asa udah berelasi sama nasabah)
    const queryCatatan = `
      SELECT 
        c.id_catatan, 
        c.isi_catatan as deskripsi, 
        c.created_at, 
        s.nama_status
      FROM catatan c
      LEFT JOIN status s ON c.id_status = s.id_status
      WHERE c.id_nasabah = ?
      ORDER BY c.created_at DESC
    `;
      
    const [catatanRows] = await pool.execute(queryCatatan, [id]);

    return {
      ...nasabahData,
      list_kontak: kontakList,
      list_catatan: catatanRows, 
    };
  }
}

module.exports = NasabahService;