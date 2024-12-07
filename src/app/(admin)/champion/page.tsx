"use client";

import React, { useState } from 'react';
import ChampionDialog from '@/components/(admin)/champion/ChampionDialog';
import { Champion } from '@/components/(admin)/champion/type';

export default function ChampionPage() {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingChampion, setEditingChampion] = useState<Champion | null>(null);

  const handleAddChampion = (newChampion: Champion) => {
    setChampions([...champions, newChampion]);
  };

  const handleEditChampion = (updatedChampion: Champion) => {
    setChampions(champions.map(champion => 
      champion.id === updatedChampion.id ? updatedChampion : champion
    ));
  };

  const handleDeleteChampion = (id: number) => {
    setChampions(champions.filter(champion => champion.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Champions</h1>
        <button
          onClick={() => {
            setEditingChampion(null);
            setIsDialogOpen(true);
          }}
          className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Add Champion
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {champions.map((champion) => (
          <div 
            key={champion.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {champion.image && (
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={URL.createObjectURL(champion.image)}
                  alt={champion.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{champion.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {champion.description}
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setEditingChampion(champion);
                    setIsDialogOpen(true);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteChampion(champion.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {champions.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No champions added yet. Add your first champion!</p>
        </div>
      )}

      {isDialogOpen && (
        <ChampionDialog
          onClose={() => {
            setIsDialogOpen(false);
            setEditingChampion(null);
          }}
          onAddChampion={handleAddChampion}
          onEditChampion={handleEditChampion}
          editingChampion={editingChampion}
        />
      )}
    </div>
  );
}
