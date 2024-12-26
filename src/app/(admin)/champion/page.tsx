"use client";

import React, { useState } from "react";
import { Champion } from "@/components/(admin)/champion/type";

import { Button } from "@/components/ui/button";
import ChampionsBox from "@/components/(admin)/champion/ChampionsBox";
export default function ChampionPage() {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingChampion, setEditingChampion] = useState<Champion | null>(null);

  const handleAddChampion = (newChampion: Champion) => {
    setChampions((prevChampions) => [...prevChampions, newChampion]);
  };

  const handleEditChampion = (updatedChampion: Champion) => {
    setChampions((prevChampions) =>
      prevChampions.map((champion) =>
        champion.id === updatedChampion.id ? updatedChampion : champion
      )
    );
  };

  const handleDeleteChampion = (id: number) => {
    setChampions((prevChampions) =>
      prevChampions.filter((champion) => champion.id !== id)
    );
  };

  // const openDialog = (champion: Champion | null = null) => {
  //   setEditingChampion(champion);
  //   setIsDialogOpen(true);
  // };

  const closeDialog = () => {
    setEditingChampion(null);
    setIsDialogOpen(false);
  };

  // const filteredChampions = champions.filter(champion => {
  //   if (selectedType === "all") return true;
  //   // Add your filtering logic here based on champion types
  //   return true;
  // });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Champions</h1>
        <Button
          onClick={() => {
            setEditingChampion(null);
            setIsDialogOpen(true);
          }}
        >
          Add Champion
        </Button>
      </div>

      <ChampionsBox />

      
    </div>
  );
}
