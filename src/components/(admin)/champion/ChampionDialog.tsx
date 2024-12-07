import React, { useState, useEffect } from 'react';
import { Champion, ChampionDialogProps } from './type';

export default function ChampionDialog({ 
  onClose, 
  onAddChampion,
  onEditChampion,
  editingChampion 
}: ChampionDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (editingChampion) {
      setTitle(editingChampion.title);
      setDescription(editingChampion.description);
      setImage(editingChampion.image);
    }
  }, [editingChampion]);

  const handleSubmit = () => {
    const championData = {
      id: editingChampion?.id || Date.now(),
      title,
      description,
      image,
    };

    if (editingChampion && onEditChampion) {
      onEditChampion(championData);
    } else {
      onAddChampion(championData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {editingChampion ? 'Edit Champion' : 'Add Champion'}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image
            </label>
            <input
              type="file"
              title="Upload Image"
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
          >
            {editingChampion ? 'Update' : 'Add'}
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