"use client";
import React, { useState } from "react";

interface LoginModalProps {
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded shadow-lg w-96">
                <h2 className="text-xl mb-4">Login</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">
                            Username
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded"
                            type="text"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded"
                            type="password"
                        />
                    </div>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        type="button"
                        onClick={onClose}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
