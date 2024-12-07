"use client";

import React, { useState } from "react";
import ChampionDialog from "@/components/(admin)/champion/ChampionDialog";
import { Champion } from "@/components/(admin)/champion/type";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";

export default function ChampionPage() {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingChampion, setEditingChampion] = useState<Champion | null>(null);

  const handleAddChampion = (newChampion: Champion) => {
    setChampions([...champions, newChampion]);
  };

  const handleEditChampion = (updatedChampion: Champion) => {
    setChampions(
      champions.map((champion) =>
        champion.id === updatedChampion.id ? updatedChampion : champion
      )
    );
  };

  const handleDeleteChampion = (id: number) => {
    setChampions(champions.filter((champion) => champion.id !== id));
  };

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {champions.map((champion) => (
          <Card key={champion.id} className="hover:shadow-lg transition-shadow">
            {champion.image && (
              <AspectRatio ratio={16 / 9} className="overflow-hidden">
                <img
                  src={URL.createObjectURL(champion.image)}
                  alt={champion.title}
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
            )}
            <CardHeader>
              <CardTitle>{champion.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 line-clamp-3">{champion.description}</p>
            </CardContent>
            <Separator />
            <CardFooter className="flex justify-end space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingChampion(champion);
                  setIsDialogOpen(true);
                }}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteChampion(champion.id)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
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
