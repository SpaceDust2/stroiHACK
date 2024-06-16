"use client";
import { useState } from "react";
import Head from "next/head";
import "tailwindcss/tailwind.css";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

interface MarkerData {
    lat: number;
    lng: number;
    label: string;
    color: string;
}

const Home = () => {
    const [markers, setMarkers] = useState<MarkerData[]>([]);
    const [selectedModels, setSelectedModels] = useState<{
        [key: number]: string[];
    }>({});
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedCamera, setSelectedCamera] = useState<number | null>(null);

    const handleMapClick = (e: any) => {
        const coords = e.get("coords");
        const label =
            prompt("Enter marker label") || `Marker ${markers.length + 1}`;
        setMarkers([
            ...markers,
            { lat: coords[0], lng: coords[1], label, color: "blue" },
        ]);
    };

    const handleMarkerClick = (index: number) => {
        const color = prompt("Enter marker color (red, green, blue)") || "blue";
        setMarkers((prev) => {
            const newMarkers = [...prev];
            newMarkers[index].color = color;
            return newMarkers;
        });
    };

    const handleModelChange = (index: number, model: string) => {
        setSelectedModels((prev) => {
            const models = prev[index] || [];
            return {
                ...prev,
                [index]: models.includes(model)
                    ? models.filter((m) => m !== model)
                    : [...models, model],
            };
        });
    };

    const openModal = (index: number) => {
        setSelectedCamera(index);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedCamera(null);
    };

    return (
        <div className="flex h-screen">
            <Head>
                <title>Construction Cameras</title>
            </Head>
            <div className="w-1/3 h-full p-4">
                <YMaps>
                    <Map
                        defaultState={{
                            center: [55.751244, 37.618423],
                            zoom: 10,
                        }}
                        width="100%"
                        height="400px"
                        onClick={handleMapClick}
                    >
                        {markers.map((marker, index) => (
                            <Placemark
                                key={index}
                                geometry={[marker.lat, marker.lng]}
                                properties={{ balloonContent: marker.label }}
                                options={{
                                    preset: `islands#${marker.color}DotIcon`,
                                }}
                                onClick={() => handleMarkerClick(index)}
                            />
                        ))}
                    </Map>
                </YMaps>
            </div>
            <div className="w-2/3 h-full overflow-y-auto p-4 space-y-4">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="bg-white p-2 rounded shadow">
                        <video
                            controls
                            className="w-full h-64 object-cover rounded mb-2"
                        >
                            <source
                                src={`/videos/${index + 1}.mp4`}
                                type="video/mp4"
                            />
                            Your browser does not support the video tag.
                        </video>
                        <div className="flex flex-col space-y-2">
                            <span className="font-bold">{`Camera ${
                                index + 1
                            }`}</span>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    "Model 1",
                                    "Model 2",
                                    "Model 3",
                                    "Model 4",
                                    "Model 5",
                                ].map((model) => (
                                    <label
                                        key={model}
                                        className="inline-flex items-center"
                                    >
                                        <input
                                            type="checkbox"
                                            className="form-checkbox"
                                            onChange={() =>
                                                handleModelChange(index, model)
                                            }
                                            checked={
                                                selectedModels[index]?.includes(
                                                    model
                                                ) || false
                                            }
                                        />
                                        <span className="ml-2">{model}</span>
                                    </label>
                                ))}
                            </div>
                            <button
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                                onClick={() => openModal(index)}
                            >
                                Отчет
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {modalOpen && selectedCamera !== null && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow-lg w-2/3 h-5/6 overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">{`Отчет для камеры ${
                                selectedCamera + 1
                            }`}</h2>
                            <button
                                className="text-gray-500"
                                onClick={closeModal}
                            >
                                Закрыть
                            </button>
                        </div>
                        <video
                            controls
                            className="w-full h-full object-cover rounded mb-4"
                        >
                            <source
                                src={`/videos/${selectedCamera + 1}_report.mp4`}
                                type="video/mp4"
                            />
                            Your browser does not support the video tag.
                        </video>
                        <div className="text-left">
                            <h3 className="text-lg font-bold mb-2">
                                События за последние сутки:
                            </h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Ничего необычного!</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
