import React, { useState } from "react";
import { HiOutlineAdjustments, HiX } from "react-icons/hi";
import InputDropDown from "./InputDropDown";
import ButtonSmall from "./ButtonSmall";

function FilterCatatan() {
    const [isOpen, setIsOpen] = useState(false);
    const [sortFilter, setSortFilter] = useState(null);
    const [statusFilter, setStatusFilter] = useState(null);

    const optionsSort = [
        {
            name: "Tanggal Terbaru",
            value: "tanggal-terbaru"
        },
        {
            name: "Tanggal Terlama",
            value: "tanggal-terlama"
        },
        {
            name: "Durasi Tersingkat",
            value: "durasi-tersingkat"
        },
        {
            name: "Durasi Terlama",
            value: "durasi-terlama"
        },
    ]

    const optionsStatus = [
    {
        name: "Belum Dihubungi",
        value: "status-1-belum-dihubungi"
    },
    {
        name: "Tidak Diangkat",
        value: "status-2-tidak-diangkat"
    },
    {
        name: "Ragu-Ragu",
        value: "status-3-ragu"
    },
    {
        name: "Sukses",
        value: "status-4-sukses"
    },
    {
        name: "Tidak Tertarik",
        value: "status-5-tidak-tertarik"
    },
    {
        name: "Nomor Salah",
        value: "status-6-nomor-salah"
    },
    {
        name: "Sedang Dihubungi",
        value: "status-7-sedang-dihubungi"
    }
    ];

    return (
        <div className="relative z-1">
            <div className="rotate-90 scale-y-[-1] cursor-pointer" onClick={() => isOpen ? setIsOpen(false) : setIsOpen(true)}>
                <HiOutlineAdjustments/>
            </div>
            <div className={"absolute mt-4 bg-white border border-black rounded-lg p-4 w-80 flex flex-col gap-4" + (isOpen ? "" : " hidden")}>
                <div className="flex items-center text-black text-lg font-medium justify-between">
                    <p className="whitespace-nowrap">Filter Catatan</p>
                    <span className="cursor-pointer" onClick={() => setIsOpen(false)}>
                        <HiX/>
                    </span>
                </div>
                <InputDropDown value={sortFilter} onChange={(e) => setSortFilter(e.target.value)} labelName={"Urutkan berdasarkan"} labelFor={"sort"} placeholder={"Pilih"} options={optionsSort}/>
                <InputDropDown value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} labelName={"Status"} labelFor={"status"} placeholder={"Pilih Status"} options={optionsStatus}/>
                <div className="flex flex-col gap-3">
                    <ButtonSmall label={"Terapkan"} isSubmit={true}/>
                    <ButtonSmall label={"Hapus Filter"} isSecondary={true} onClick={() => {setSortFilter(null); setStatusFilter(null);}}/>
                </div>
            </div>
        </div>
    );
}

export default FilterCatatan;