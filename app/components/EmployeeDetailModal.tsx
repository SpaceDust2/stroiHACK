// components/EmployeeDetailModal.tsx

import React from "react";
import Modal from "react-modal";
import { Employee } from "../types/employee.ts"; // Предполагается, что типы данных сотрудников определены в файле types/employee.ts

interface Props {
    isOpen: boolean;
    onClose: () => void;
    employee: Employee;
}

const EmployeeDetailModal: React.FC<Props> = ({
    isOpen,
    onClose,
    employee,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="modal"
            overlayClassName="overlay"
        >
            <div className="p-4">
                <h2 className="text-xl font-bold mb-4">{employee.fullName}</h2>
                <p>{employee.position}</p>
                {/* Другие данные сотрудника */}
            </div>
        </Modal>
    );
};

export default EmployeeDetailModal;
