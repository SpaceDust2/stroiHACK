import React from "react";
import Gantt from "react-gantt";

interface Task {
    id: number;
    title: string;
    startDate: string; // В формате, который поддерживает библиотека для дат
    endDate: string; // В формате, который поддерживает библиотека для дат
}

interface GanttChartProps {
    tasks: Task[];
}

const GanttChart: React.FC<GanttChartProps> = ({ tasks }) => {
    const ganttData = tasks.map((task) => ({
        id: task.id.toString(),
        title: task.title,
        start: new Date(task.startDate),
        end: new Date(task.endDate),
    }));

    return (
        <div className="border border-gray-200 rounded p-4">
            <h2 className="text-lg font-semibold">Gantt Chart</h2>
            <div style={{ overflowX: "auto" }}>
                <Gantt
                    tasks={ganttData}
                    preferences={{
                        header_height: 50,
                        bar_height: 20,
                        step: 24,
                        view_modes: [
                            "Quarter Day",
                            "Half Day",
                            "Day",
                            "Week",
                            "Month",
                        ],
                        bar_corner_radius: 3,
                        arrow_curve: 5,
                        padding: 18,
                        view_mode: "Day", // Настройка режима отображения по умолчанию
                    }}
                />
            </div>
        </div>
    );
};

export default GanttChart;
