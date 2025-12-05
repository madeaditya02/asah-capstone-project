import React from 'react';
import Container from '../../components/Container';
import SectionCard from '../../components/SectionCard';
import TabelDaftarCatatan from '../../components/TabelDaftarCatatan';
import ContainerFooter from '../../components/ContainerFooter';
import ButtonLarge from '../../components/ButtonLarge';
import { useNavigate, useParams } from 'react-router-dom';

function DaftarCatatanPage() {
    const navigate = useNavigate();
    const { nasabahId } = useParams();
    const namaNasabah = "Ari Putra";
    const jumlahCatatan = 5;
    const dataCatatan = [
    {
        id_catatan: "CAT001",
        deskripsi_catatan: "Nasabah dihubungi untuk konfirmasi data pribadi",
        waktu_dihubungi: "2025-12-01 09:15:00",
        durasi: "10:10:01",
        id_user: 1,
        id_status: "ST001",
        nama_status: "Tidak Tertarik"
    },
    {
        id_catatan: "CAT002",
        deskripsi_catatan: "Follow up terkait pengajuan kredit",
        waktu_dihubungi: "2025-12-01 11:30:00",
        durasi: "00:20:00",
        id_user: 2,
        id_status: "ST002",
        nama_status: "Ragu-Ragu"
    },
    {
        id_catatan: "CAT003",
        deskripsi_catatan: "Nasabah belum bisa dihubungi, nomor tidak aktif",
        waktu_dihubungi: "2025-12-02 14:00:00",
        durasi: null,
        id_user: 1,
        id_status: "ST003",
        nama_status: "Tidak Diangkat"
    },
    {
        id_catatan: "CAT004",
        deskripsi_catatan: "Memberikan informasi produk tabungan baru",
        waktu_dihubungi: "2025-12-02 16:45:00",
        durasi: "00:15:00",
        id_user: 3,
        id_status: "ST001",
        nama_status: "Ragu-Ragu"
    },
    {
        id_catatan: "CAT005",
        deskripsi_catatan: "Nasabah meminta waktu untuk mempertimbangkan penawaran",
        waktu_dihubungi: "2025-12-03 10:00:00",
        durasi: "00:12:00",
        id_user: 2,
        id_status: "ST002",
        nama_status: "Sukses"
    }
    ];

    return (
        <>
            <Container isDashboard={false} pageName={"Catatan: " + namaNasabah}>
                <div className='pb-32'>
                    <SectionCard sectionTitle={"Daftar Catatan Sales (" + jumlahCatatan + ")"} showFilterMenu={true}>
                        {
                            dataCatatan !== null
                            ? <TabelDaftarCatatan dataCatatan={dataCatatan}/>
                            : <p className='font-semibold text-gray-400'>Belum Ada Catatan.</p>
                        }
                    </SectionCard>
                </div>
            </Container>
            <ContainerFooter>
                <ButtonLarge label={"+ Tambah Catatan"} onClick={() => navigate(`/nasabah/${nasabahId}/catatan/tambah`)}/>
            </ContainerFooter>
        </>
    );
}

export default DaftarCatatanPage;