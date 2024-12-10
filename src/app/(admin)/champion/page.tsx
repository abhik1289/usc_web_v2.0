"use client";

import React, { useState } from "react";
import ChampionDialog from "@/components/(admin)/champion/ChampionDialog";
import { Champion } from "@/components/(admin)/champion/type";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function ChampionPage() {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingChampion, setEditingChampion] = useState<Champion | null>(null);
  const [selectedType, setSelectedType] = useState("all");

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {champions.map((champion) => (
          <Card key={champion.id} className="hover:shadow-lg transition-shadow">
            {champion.image && (
              <AspectRatio ratio={16 / 9} className="overflow-hidden">
                <Image
                  width={100}
                  height={100}
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
              <p className="text-gray-600 line-clamp-3">
                {champion.description}
              </p>
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
          <p className="text-gray-500">
            No champions added yet. Add your first champion!
          </p>
        </div>
      )}

      {/* Champion Dialog */}
      {isDialogOpen && (
        <ChampionDialog
          onClose={closeDialog}
          onAddChampion={handleAddChampion}
          onEditChampion={handleEditChampion}
          editingChampion={editingChampion}
        />
      )}
    </div>
  );
}
