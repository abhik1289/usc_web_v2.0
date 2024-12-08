"use client";

import React, { useState, useEffect } from "react";
import { Champion, ChampionDialogProps } from "./type";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";

export default function ChampionDialog({
  onClose,
  onAddChampion,
  onEditChampion,
  editingChampion,
}: ChampionDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (editingChampion) {
      setTitle(editingChampion.title);
      setDescription(editingChampion.description);
      setImage(editingChampion.image);
    }
  }, [editingChampion]);

  const handleSubmit = () => {
    const championData: Champion = {
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files ? e.target.files[0] : null);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <h2 className="text-xl font-semibold">
            {editingChampion ? "Edit Champion" : "Add Champion"}
          </h2>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <Label htmlFor="image">Upload Image</Label>
            <Input
              id="image"
              type="file"
              onChange={handleImageChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="mt-1"
            />
          </div>
        </div>
        <DialogFooter className="mt-6">
          <Button onClick={handleSubmit} className="w-full">
            {editingChampion ? "Update" : "Add"}
          </Button>
          <Button
            variant="secondary"
            onClick={onClose}
            className="w-full mt-2"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
