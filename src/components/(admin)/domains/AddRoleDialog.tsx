import React, { useState, useEffect } from 'react';
import { Role } from './type';

interface AddRoleDialogProps {
  onClose: () => void;
  onAddRole: (role: Role) => void;
  editingRole?: Role | null;
  onEditRole?: (role: Role) => void;
}

export default function AddRoleDialog({ 
  onClose, 
  onAddRole, 
  editingRole,
  onEditRole 
}: AddRoleDialogProps) {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (editingRole) {
      setTitle(editingRole.title);
    }
  }, [editingRole]);

  const handleSubmit = () => {
    if (editingRole && onEditRole) {
      onEditRole({ id: editingRole.id, title });
    } else {
      onAddRole({ id: Date.now(), title });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">
          {editingRole ? 'Edit Role' : 'Add Role'}
        </h2>
        <input
          type="text"
          placeholder="Role"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          {editingRole ? 'Update' : 'Add'}
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