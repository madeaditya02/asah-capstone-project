import React from "react";
import { HiHome, HiOutlineLogout } from "react-icons/hi";
import { AiFillCaretLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Container({ isDashboard, pageName, children}) {  
    const navigate = useNavigate();
    return (
        <div className="h-full">
            <header className="flex justify-between m-8">
                <div className="text-4xl font-bold flex gap-3 items-center text-primary-700">
                    {
                        isDashboard 
                        ? <span className="cursor-pointer" onClick={() => navigate('/')}>
                            <HiHome/> 
                        </span>
                        : <span className="cursor-pointer" onClick={() => navigate(-1)}>
                            <AiFillCaretLeft/>
                        </span>
                    }
                    <h1>{isDashboard ? "Dashboard" : pageName}</h1>
                </div>
                <div className="flex gap-4 items-center bg-primary-10 p-4 rounded-xl">
                    <div className="bg-primary-500 text-white rounded-full h-10 w-10 flex items-center justify-center">
                        <p>BW</p>
                    </div>
                    <div>
                        <p>Budi Wati</p>
                        <p className="text-gray-500">budiwati@gmail.com</p>
                    </div>
                    <div className="text-3xl text-red-500">
                        <HiOutlineLogout/>
                    </div>
                </div>
            </header>
            <main className="bg-main h-full p-8">
                {children}
            </main>
        </div>
    )
}

export default Container;