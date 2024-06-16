// components/Sidebar.tsx
import Link from "next/link";
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
        <div className="w-[100px]  h-[600px] bg-[#F8F8F7] text-white flex flex-col rounded-3xl my-10 shadow-md items-center py-4">
            <div className="mb-8">
                <Link href="/">
                    <img src="/4.png" alt="Logo" className="w-10 h-10" />
                </Link>
            </div>
            <div className="flex flex-col space-y-6">
                <button className="text-black hover:text-blue-500">
                    <Link href="/workers">
                        <FaUsers size={24} />
                    </Link>
                </button>
                <button className="text-black hover:text-blue-500">
                    <Link href="/machine">
                        <FaTools size={24} />
                    </Link>
                </button>
                <button className=" text-black hover:text-blue-500">
                    <Link href="/gant">
                        <FaTasks size={24} />
                    </Link>
                </button>
                <button className="text-black hover:text-blue-500">
                    <Link href="/charts">
                        <FaChartLine size={24} />
                    </Link>
                </button>
                <button className="text-black hover:text-blue-500">
                    <FaClipboardList size={24} />
                </button>
                <button className="text-black hover:text-blue-500">
                    <FaFileAlt size={24} />
                </button>
                <button className="text-black hover:text-blue-500">
                    <Link href="/camera">
                        <FaDrawPolygon size={24} />
                    </Link>
                </button>
                <button className="text-black hover:text-blue-500">
                    <Link href="/contragent">
                        <FaHandshake size={24} />
                    </Link>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
