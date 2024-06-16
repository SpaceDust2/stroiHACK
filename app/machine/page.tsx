"use client"
import { NextPage } from 'next';
import React, { useState } from 'react';
import Modal from 'react-modal';
import MachineryCard from '../components/MachineryCard';
import machineryData from '../data/machinery.ts'; // Assuming you have a machinery data file
import { Machinery } from '../types/machinery'; // Assuming you have a machinery type file

// Styles for the modal
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

const MachineryPage: NextPage = () => {
  const [machinery, setMachinery] = useState<Machinery[]>(machineryData);
  const [filterStatus, setFilterStatus] = useState<string>(''); // Status for filtering
  const [modalMachinery, setModalMachinery] = useState<Machinery | null>(null); // State for modal machinery

  // Function to open modal with detailed machinery information
  const openModal = (machinery: Machinery) => {
    setModalMachinery(machinery);
  };

  // Function to close modal
  const closeModal = () => {
    setModalMachinery(null);
  };

  // Function to filter machinery by status
  const filterByStatus = (status: string) => {
    if (status === '') {
      setMachinery(machineryData);
    } else {
      const filteredMachinery = machineryData.filter(item => item.status === status);
      setMachinery(filteredMachinery);
    }
    setFilterStatus(status);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">List of Machinery</h1>

      {/* Filter buttons */}
      <div className="mb-4">
        <button
          onClick={() => filterByStatus('')}
          className={`mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ${filterStatus === '' && 'bg-blue-500 text-white'}`}
        >
          All
        </button>
        <button
          onClick={() => filterByStatus('Working')}
          className={`mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ${filterStatus === 'Working' && 'bg-blue-500 text-white'}`}
        >
          Working
        </button>
        <button
          onClick={() => filterByStatus('Under Maintenance')}
          className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ${filterStatus === 'Under Maintenance' && 'bg-blue-500 text-white'}`}
        >
          Under Maintenance
        </button>
      </div>

      {/* List of machinery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {machinery.map(item => (
          <MachineryCard key={item.id} machinery={item} openModal={() => openModal(item)} />
        ))}
      </div>

      {/* Modal for detailed machinery information */}
      <Modal
        isOpen={modalMachinery !== null}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Detailed Machinery Information"
      >
        {modalMachinery && (
          <div>
            <h2 className="text-2xl font-bold mb-4">{modalMachinery.name}</h2>
            <p className="mb-2"><strong>Type:</strong> {modalMachinery.type}</p>
            <p className="mb-2"><strong>Model:</strong> {modalMachinery.model}</p>
            <p className="mb-2"><strong>Status:</strong> {modalMachinery.status}</p>
            <p className="mb-2"><strong>Year:</strong> {modalMachinery.year}</p>
            <p className="mb-2"><strong>Location:</strong> {modalMachinery.location}</p>
            <p className="mb-2"><strong>Next Maintenance Due:</strong> {modalMachinery.maintenanceDue}</p>
            <p className="mb-2"><strong>Operational Hours:</strong> {modalMachinery.operationalHours}</p>
            <button
              onClick={closeModal}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4"
            >
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MachineryPage;
