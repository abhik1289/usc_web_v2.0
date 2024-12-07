import React, { useState } from 'react';

interface Domain {
  id: number;
  type: string;
  name: string;
}

interface AddDomainDialogProps {
  onClose: () => void;
  onAddDomain: (domain: Domain) => void;
}

export default function AddDomainDialog({ onClose, onAddDomain }: AddDomainDialogProps) {
  const [type, setType] = useState('tech');
  const [name, setName] = useState('');

  const handleSubmit = () => {
    const newDomain = {
      id: Date.now(),
      type,
      name,
    };
    onAddDomain(newDomain);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">Add Domain</h2>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        >
          <option value="tech">Tech</option>
          <option value="nonTech">Non-Tech</option>
        </select>
        <input
          type="text"
          placeholder="Domain Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Add
        </button>
        <button
          onClick={onClose}
          className="w-full mt-2 bg-gray-700 text-white py-2 rounded hover:bg-gray-800"
        >
          Cancel
        </button>
      </div>
    </div>
  );
} 