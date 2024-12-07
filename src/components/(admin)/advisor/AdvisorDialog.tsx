import React, { useState, useEffect } from 'react';
import { AdvisorMember, AdvisorDialogProps } from './type';

export default function AdvisorDialog({ 
  onClose, 
  onSubmit,
  editingMember 
}: AdvisorDialogProps) {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'advisor' | 'mentor'>('advisor');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);

  useEffect(() => {
    if (editingMember) {
      setName(editingMember.name);
      setTitle(editingMember.title);
      setType(editingMember.type);
      setAdditionalInfo(editingMember.additionalInfo || '');
      setPhoto(editingMember.photo);
    }
  }, [editingMember]);

  const handleSubmit = () => {
    const memberData: AdvisorMember = {
      id: editingMember?.id || Date.now(),
      name,
      title,
      type,
      photo,
      ...(additionalInfo && { additionalInfo }),
    };

    onSubmit(memberData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {editingMember ? 'Edit Member' : 'Add Member'}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Photo
            </label>
            <input
              type="file"
              title="Upload Photo"
              onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Member Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as 'advisor' | 'mentor')}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:outline-none"
            >
              <option value="advisor">Advisor</option>
              <option value="mentor">Mentor</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {type === 'advisor' ? 'School' : 'Custom Title'}
            </label>
            <input
              type="text"
              placeholder={type === 'advisor' ? 'Enter school' : 'Enter custom title'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
          {type === 'mentor' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Information
              </label>
              <textarea
                placeholder="Enter additional information"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>
          )}
          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
          >
            {editingMember ? 'Update' : 'Add'}
          </button>
          <button
            onClick={onClose}
            className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
} 