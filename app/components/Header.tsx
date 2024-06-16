"use client";
import React, { useState } from "react";
import { FaBell, FaCommentDots, FaUser, FaSearch } from "react-icons/fa";
import { usePathname } from "next/navigation";

const tabTitles: { [key: string]: string } = {
    "/workers": "Работники",
    "/machine": "Техника",
    "/gant": "Диграмма Ганта",
    "/charts": "Графики",
    "/tasks": "Задачи",
    "/reports": "Отчеты",
    "/camera": "Управления камерами",
    "/contragent": "Контрагент",
    "/": "Главная страница",
};

interface HeaderProps {
    selectedTab?: string;
}

const Header: React.FC<HeaderProps> = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const pathname = usePathname();
    const title = tabTitles[pathname] || "Главная страница";

    return (
        <header className="flex items-center justify-between p-4 bg-white">
            <div className="flex items-center gap-12">
                <h1 className="text-3xl font-bold">{title}</h1>
                <div className="relative flex items-center">
                    <input
                        type="text"
                        className="p-2 pl-4 pr-10 border border-gray-500 rounded-3xl focus:outline-none focus:border-blue-500"
                        placeholder="Поиск..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <FaSearch className="absolute right-3 text-gray-400 pointer-events-none" />
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-600 hover:text-gray-800">
                    <FaBell className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-800">
                    <FaCommentDots className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-800">
                    <FaUser className="w-5 h-5" />
                </button>
            </div>
        </header>
    );
};

export default Header;
