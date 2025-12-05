import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiHome, FiUsers } from "react-icons/fi";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menus = [
    { 
      name: "Dashboard", 
      path: "/admin/profile", 
      icon: <FiHome size={22} /> 
    },
    { 
      name: "Manajemen Akun", 
      path: "/admin/manage-sales", 
      icon: <FiUsers size={22} /> 
    },
  ];

  return (

    <div className="w-[80px] min-w-[80px] h-screen bg-white border-r border-gray-200 flex flex-col items-center pt-32 sticky top-0 z-40">
      
      <div className="flex flex-col gap-4 w-full">
        {menus.map((menu, index) => {
          const isActive = location.pathname.includes(menu.path);

          return (
            <button
              key={index}
              onClick={() => navigate(menu.path)}
              className={`relative w-full h-[50px] flex items-center justify-center transition-all duration-200 group
                ${
                  isActive
                    ? "bg-[#E5F0FF] text-[#0058D2]" 
                    : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                }
              `}
              title={menu.name}
            >
            
              {menu.icon}

              
              {isActive && (
                <div className="absolute right-0 top-0 bottom-0 w-[4px] bg-[#0058D2] rounded-l-md" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;