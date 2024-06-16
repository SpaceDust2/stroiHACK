// pages/index.tsx
"use client";
// pages/index.tsx
// pages/index.tsx

import { NextPage } from 'next';
import React, { useState } from 'react';
import Modal from 'react-modal';
import EmployeeCard from '../components/EmployeeCard';
import employeesData from '../data/employees';
import { Employee } from '../types/employee';

// Стили для модального окна
const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '600px',
    width: '100%',
    border: 'none',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
  },
};

const Page: NextPage = () => {
  const [employees, setEmployees] = useState<Employee[]>(employeesData);
  const [filterStatus, setFilterStatus] = useState<string>(''); // Статус для фильтрации
  const [modalEmployee, setModalEmployee] = useState<Employee | null>(null);

  // Функция для открытия модального окна с подробной информацией о сотруднике
  const openModal = (employee: Employee) => {
    setModalEmployee(employee);
  };

  // Функция для закрытия модального окна
  const closeModal = () => {
    setModalEmployee(null);
  };

  // Функция для фильтрации по статусу выполнения работ
  const filterByStatus = (status: string) => {
    if (status === '') {
      setEmployees(employeesData);
    } else {
      const filteredEmployees = employeesData.filter(employee => employee.workStatus === status);
      setEmployees(filteredEmployees);
    }
    setFilterStatus(status);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Список сотрудников</h1>

      {/* Кнопки для фильтрации */}
      <div className="mb-4">
        <button
          onClick={() => filterByStatus('')}
          className={`mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ${filterStatus === '' && 'bg-blue-500 text-white'}`}
        >
          Все
        </button>
        <button
          onClick={() => filterByStatus('В процессе')}
          className={`mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ${filterStatus === 'В процессе' && 'bg-blue-500 text-white'}`}
        >
          В процессе
        </button>
        <button
          onClick={() => filterByStatus('Выполнено')}
          className={`mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ${filterStatus === 'Выполнено' && 'bg-blue-500 text-white'}`}
        >
          Выполнено
        </button>
        <button
          onClick={() => filterByStatus('Просрочено')}
          className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ${filterStatus === 'Просрочено' && 'bg-blue-500 text-white'}`}
        >
          Просрочено
        </button>
      </div>

      {/* Список сотрудников */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.map(employee => (
          <EmployeeCard key={employee.id} employee={employee} openModal={() => openModal(employee)} />
        ))}
      </div>

      {/* Модальное окно для подробной информации о сотруднике */}
      <Modal
        isOpen={modalEmployee !== null}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Подробная информация о сотруднике"
      >
        {modalEmployee && (
          <div>
            <h2 className="text-2xl font-bold mb-4">{modalEmployee.fullName}</h2>
            <p className="mb-2"><strong>Должность:</strong> {modalEmployee.position}</p>
            <p className="mb-2"><strong>Телефон:</strong> {modalEmployee.phone}</p>
            <p className="mb-2"><strong>Email:</strong> {modalEmployee.email}</p>
            <p className="mb-2"><strong>Загруженность:</strong> {modalEmployee.loadPercentage}%</p>
            <p className="mb-2"><strong>Количество назначенных работ:</strong> {modalEmployee.assignedWorks}</p>
            <p className="mb-2"><strong>Количество сданных работ:</strong> {modalEmployee.completedWorks}</p>
            <p className="mb-2"><strong>Текущие дедлайны:</strong> {modalEmployee.nextDeadline}</p>
            <p className="mb-2"><strong>Заявки:</strong> {modalEmployee.openRequests}</p>
            <p className="mb-2"><strong>Статус выполнения работ:</strong> {modalEmployee.workStatus}</p>
            <button
              onClick={closeModal}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4"
            >
              Закрыть
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Page;
