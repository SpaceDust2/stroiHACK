// data/employees.js

const employees = [
    {
        id: 1,
        fullName: "Иван Иванов",
        position: "Прораб",
        loadPercentage: 60,
        assignedWorks: 15,
        completedWorks: 10,
        nextDeadline: "2024-06-30", // Пример даты
        openRequests: 2,
        workStatus: "В процессе",
    },
    {
        id: 2,
        fullName: "Петр Петров",
        position: "Прораб",
        loadPercentage: 80,
        assignedWorks: 20,
        completedWorks: 18,
        nextDeadline: "2024-07-15", // Пример даты
        openRequests: 1,
        workStatus: "Выполнено",
    },
    {
        id: 3,
        fullName: "Мария Сидорова",
        position: "Прораб",
        loadPercentage: 40,
        assignedWorks: 12,
        completedWorks: 8,
        nextDeadline: "2024-06-25", // Пример даты
        openRequests: 0,
        workStatus: "Просрочено",
    },
    // Добавьте данные других сотрудников по аналогии
];

export default employees;
