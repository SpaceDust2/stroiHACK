"use client";
import { NextPage } from "next";
import React, { useState } from "react";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Modal from "react-modal";

Chart.register(...registerables);

interface Props {}

const Page: NextPage<Props> = ({}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");

    const openModal = (analysis) => {
        setModalContent(analysis);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const lineData = {
        labels: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь"],
        datasets: [
            {
                label: "Прогресс строительства",
                data: [10, 25, 35, 50, 70, 90],
                fill: false,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)",
            },
        ],
    };

    const barData = {
        labels: ["Бетон", "Сталь", "Кирпич", "Дерево"],
        datasets: [
            {
                label: "Использованные материалы",
                data: [2500, 1800, 1200, 800],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                ],
                borderColor: [
                    "rgba(255,99,132,1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const pieData = {
        labels: ["Рабочие", "Инженеры", "Менеджеры"],
        datasets: [
            {
                data: [50, 20, 10],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
        ],
    };

    const doughnutData = {
        labels: ["Завершено", "В процессе", "Не начато"],
        datasets: [
            {
                data: [30, 40, 30],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
        ],
    };

    const taskData = {
        labels: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь"],
        datasets: [
            {
                label: "Задачи выполненные",
                data: [25, 30, 40, 35, 45, 50],
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)",
            },
            {
                label: "Задачи запланированные",
                data: [30, 35, 45, 40, 50, 55],
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
            },
        ],
    };

    const calendarData = {
        labels: [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь",
        ],
        datasets: [
            {
                label: "Дедлайны",
                data: [2, 0, 1, 3, 1, 0, 2, 1, 0, 2, 1, 1],
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
            },
        ],
    };

    return (
        <div>
            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1">
                    <Line data={lineData} height={200} />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() =>
                            openModal("Анализ прогресса строительства...")
                        }
                    >
                        Анализ
                    </button>
                </div>
                <div className="col-span-1">
                    <Bar data={barData} height={200} />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() =>
                            openModal("Анализ использованных материалов...")
                        }
                    >
                        Анализ
                    </button>
                </div>
                <div className="col-span-1">
                    <Pie data={pieData} height={200} />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => openModal("Анализ рабочих ресурсов...")}
                    >
                        Анализ
                    </button>
                </div>
                <div className="col-span-1">
                    <Doughnut data={doughnutData} height={200} />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => openModal("Анализ статуса задач...")}
                    >
                        Анализ
                    </button>
                </div>
                <div className="col-span-1">
                    <Bar data={taskData} height={200} />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() =>
                            openModal(
                                "Анализ выполненных и запланированных задач..."
                            )
                        }
                    >
                        Анализ
                    </button>
                </div>
                <div className="col-span-1">
                    <Bar data={calendarData} height={200} />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() =>
                            openModal("Анализ дедлайнов по месяцам...")
                        }
                    >
                        Анализ
                    </button>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Анализ графика"
            >
                <h2>Анализ графика</h2>
                <p>{modalContent}</p>
                <button
                    onClick={closeModal}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Закрыть
                </button>
            </Modal>
        </div>
    );
};
export default Page;
