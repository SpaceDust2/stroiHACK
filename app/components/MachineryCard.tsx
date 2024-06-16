// components/MachineryCard.tsx

import React from 'react';
import Modal from 'react-modal';
import { Machinery } from '../types/machinery';

interface Props {
  machinery: Machinery;
  openModal: () => void;
}

const MachineryCard: React.FC<Props> = ({ machinery, openModal }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <div className="mb-4">
        <h2 className="text-lg font-bold">{machinery.name}</h2>
        <p className="text-sm">{machinery.type}</p>
      </div>
      <div className="mb-4">
        <p>Модель: {machinery.model}</p>
        <p>Год выпуска: {machinery.year}</p>
      </div>
      <div className="mb-4">
        <p>Статус: {machinery.status}</p>
        <p>Местоположение: {machinery.location}</p>
      </div>
      <div className="mb-4">
        <p>Дата следующего техобслуживания: {machinery.maintenanceDue}</p>
        <p>Наработка (часы): {machinery.operationalHours}</p>
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

export default MachineryCard;
