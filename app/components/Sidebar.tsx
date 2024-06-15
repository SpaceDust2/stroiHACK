// components/Sidebar.tsx
import React from "react";
import {
    FaUsers,
    FaTools,
    FaTasks,
    FaChartLine,
    FaClipboardList,
    FaFileAlt,
    FaDrawPolygon,
    FaHandshake,
} from "react-icons/fa";

const Sidebar = () => {
    return (
        <div className="w-[100px] h-screen bg-[#F8F8F7] text-white flex flex-col rounded-3xl my-5 shadow-md items-center py-4">
            <div className="mb-8">
                <img src="/1.jpg" alt="Logo" className="w-12 h-12" />
            </div>
            <div className="flex flex-col space-y-6">
                <button className="text-black hover:text-blue-500">
                    <FaUsers size={24} />
                </button>
                <button className="text-black hover:text-blue-500">
                    <FaTools size={24} />
                </button>
                <button className=" text-black hover:text-blue-500">
                    <FaTasks size={24} />
                </button>
                <button className="text-black hover:text-blue-500">
                    <FaChartLine size={24} />
                </button>
                <button className="text-black hover:text-blue-500">
                    <FaClipboardList size={24} />
                </button>
                <button className="text-black hover:text-blue-500">
                    <FaFileAlt size={24} />
                </button>
                <button className="text-black hover:text-blue-500">
                    <FaDrawPolygon size={24} />
                </button>
                <button className="text-black hover:text-blue-500">
                    <FaHandshake size={24} />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
