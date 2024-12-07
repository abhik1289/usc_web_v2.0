"use client";

import React, { useState, useCallback } from "react";
import ChampionDialog from "@/components/(admin)/champion/ChampionDialog";
import { Champion } from "@/components/(admin)/champion/type";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

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
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Champions</h1>
        <Button onClick={openAddDialog}>Add Champion</Button>
      </div>

      {champions.length === 0 ? (
        <div className="text-center py-12 bg-muted rounded-lg border border-border">
          <p className="text-foreground/60">No champions added yet. Add your first champion!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {champions.map((champion) => (
            <Card 
              key={champion.id} 
              className="group hover:shadow-lg transition-all duration-300 bg-card"
            >
              {champion.image && (
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={URL.createObjectURL(champion.image)}
                    alt={champion.title}
                    className="w-full h-full object-cover rounded-t-lg"
                    loading="lazy"
                  />
                </AspectRatio>
              )}
              <CardHeader>
                <CardTitle className="line-clamp-1 text-foreground">
                  {champion.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 line-clamp-3">
                  {champion.description}
                </p>
              </CardContent>
              <Separator className="bg-border" />
              <CardFooter className="flex justify-end space-x-3 p-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditDialog(champion)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteChampion(champion.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {dialogState.isOpen && (
        <ChampionDialog
          onClose={closeDialog}
          onAddChampion={handleAddChampion}
          onEditChampion={handleEditChampion}
          editingChampion={dialogState.editingChampion}
        />
      )}
    </div>
  );
}
