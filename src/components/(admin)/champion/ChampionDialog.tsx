import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ChampionDialogProps } from './type';

export default function ChampionDialog({
  onClose,
  onAddChampion,
  onEditChampion,
  editingChampion,
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files ? e.target.files[0] : null);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{editingChampion ? 'Edit Champion' : 'Add Champion'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="image" className="mb-1">
              Upload Image
            </Label>
            <Input
              id="image"
              type="file"
              onChange={handleImageChange}
            />
          </div>
          <div>
            <Label htmlFor="title" className="mb-1">
              Title
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div>
            <Label htmlFor="description" className="mb-1">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter description"
              value={description}
              onChange={handleDescriptionChange}
              rows={4}
            />
          </div>
        </div>
        <DialogFooter className="mt-4 space-y-2 sm:space-y-0 sm:flex sm:justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>{editingChampion ? 'Update' : 'Add'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
