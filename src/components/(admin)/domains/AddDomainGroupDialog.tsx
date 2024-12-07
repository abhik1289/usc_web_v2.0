import React, { useState, useEffect } from 'react';
import { DomainGroup } from './type';

interface AddDomainGroupDialogProps {
  onClose: () => void;
  onAddDomainGroup: (group: DomainGroup) => void;
  editingGroup?: DomainGroup | null;
  onEditDomainGroup?: (group: DomainGroup) => void;
}

export default function AddDomainGroupDialog({ 
  onClose, 
  onAddDomainGroup,
  editingGroup,
  onEditDomainGroup 
}: AddDomainGroupDialogProps) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (editingGroup) {
      setName(editingGroup.name);
    }
  }, [editingGroup]);

  const handleSubmit = () => {
    if (editingGroup && onEditDomainGroup) {
      onEditDomainGroup({ id: editingGroup.id, name });
    } else {
      onAddDomainGroup({ id: Date.now(), name });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">
          {editingGroup ? 'Edit Domain Group' : 'Add Domain Group'}
        </h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          {editingGroup ? 'Update' : 'Add'}
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