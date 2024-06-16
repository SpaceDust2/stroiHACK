import { Machinery } from "../types/machinery";

const machineryData: Machinery[] = [
    {
        id: 1,
        name: "Экскаватор Hitachi EX200-5",
        type: "Экскаватор",
        model: "Hitachi EX200-5",
        status: "Рабочий",
        year: 2018,
        location: "Москва",
        maintenanceDue: "2025-01-01",
        operationalHours: 2500,
    },
    {
        id: 2,
        name: "Бульдозер CAT D6R",
        type: "Бульдозер",
        model: "CAT D6R",
        status: "Ремонт",
        year: 2016,
        location: "Санкт-Петербург",
        maintenanceDue: "2024-08-15",
        operationalHours: 3200,
    },
    // Add more machinery objects as needed
];

export default machineryData;
