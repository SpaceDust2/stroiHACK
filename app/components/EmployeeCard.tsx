// components/EmployeeCard.tsx

import React from 'react';
import Modal from 'react-modal';
import { Employee } from '../types/employee';

interface Props {
  employee: Employee;
  openModal: () => void;
}

const EmployeeCard: React.FC<Props> = ({ employee, openModal }) => {

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <div className="mb-4">
        <h2 className="text-lg font-bold">{employee.fullName}</h2>
        <p className="text-sm">{employee.position}</p>
      </div>
      <div className="mb-4">
        <p>Загруженность: {employee.loadPercentage}%</p>
        <div className="h-2 bg-gray-200 rounded">
          <div className={`h-full bg-blue-500 rounded ${employee.loadPercentage > 0 ? `w-${employee.loadPercentage}` : 'w-0'}`}></div>
        </div>
      </div>
      <div className="mb-4">
        <p>Количество назначенных работ: {employee.assignedWorks}</p>
        <p>Количество сданных работ: {employee.completedWorks}</p>
      </div>
      <div className="mb-4">
        <p>Текущие дедлайны: {employee.nextDeadline}</p>
      </div>
      <div className="mb-4">
        <p>Заявки: {employee.openRequests}</p>
      </div>
      <div className="mb-4">
        <p>Статус выполнения работ: {employee.workStatus}</p>
      </div>
      <div className="mt-4">
        <button
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Подробная информация
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
