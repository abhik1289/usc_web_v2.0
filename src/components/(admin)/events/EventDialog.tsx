"use client"

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

interface Event {
  id: number;
  title: string;
  description: string;
  venue: string;
  date: string;
  startDate?: string;
  endDate?: string;
  socials: string;
  image: File | null;
}

interface EventDialogProps {
  onClose: () => void;
  onAddEvent: (event: Event) => void;
  onEditEvent?: (event: Event) => void;
  editingEvent?: Event | null;
}

export default function EventDialog({ 
  onClose, 
  onAddEvent, 
  onEditEvent,
  editingEvent 
}: EventDialogProps) {
  const [mounted, setMounted] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [venue, setVenue] = useState('');
  const [dateType, setDateType] = useState('single');
  const [date, setDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [socials, setSocials] = useState('');
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setDescription(editingEvent.description);
      setVenue(editingEvent.venue);
      setDateType(editingEvent.startDate ? 'multiple' : 'single');
      setDate(editingEvent.date);
      setStartDate(editingEvent.startDate || '');
      setEndDate(editingEvent.endDate || '');
      setSocials(editingEvent.socials);
      setImage(editingEvent.image);
    }
  }, [editingEvent]);

  const handleSubmit = () => {
    const eventData = {
      id: editingEvent?.id || Date.now(),
      title,
      description,
      venue,
      date: dateType === 'single' ? date : '',
      startDate: dateType === 'multiple' ? startDate : undefined,
      endDate: dateType === 'multiple' ? endDate : undefined,
      socials,
      image,
    };

    if (editingEvent && onEditEvent) {
      onEditEvent(eventData);
    } else {
      onAddEvent(eventData);
    }
    onClose();
  };

  if (!mounted) {
    return null;
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="w-96 p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold mb-4">
            {editingEvent ? 'Edit Event' : 'Add Event'}
          </DialogTitle>
        </DialogHeader>
        <Input
          type="file"
          title="Upload Image"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            setImage(e.target.files ? e.target.files[0] : null)
          }
          className="w-full mb-2"
        />
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          className="w-full mb-2"
        />
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
          className="w-full mb-2"
        />
        <Input
          type="text"
          placeholder="Venue"
          value={venue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVenue(e.target.value)}
          className="w-full mb-2"
        />
        <div className="mb-2">
          <RadioGroup value={dateType} onValueChange={setDateType} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="single" id="single" />
              <Label htmlFor="single">Single Day</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="multiple" id="multiple" />
              <Label htmlFor="multiple">Multiple Days</Label>
            </div>
          </RadioGroup>
        </div>
        {dateType === 'single' ? (
          <Input
            type="date"
            value={date}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
            className="w-full mb-2"
          />
        ) : (
          <>
            <Input
              type="date"
              placeholder="Start Date"
              value={startDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
              className="w-full mb-2"
            />
            <Input
              type="date"
              placeholder="End Date"
              value={endDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
              className="w-full mb-2"
            />
          </>
        )}
        <Input
          type="text"
          placeholder="Add Socials"
          value={socials}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSocials(e.target.value)}
          className="w-full mb-4"
        />
        <DialogFooter>
          <Button onClick={handleSubmit} className="w-full">
            {editingEvent ? 'Update' : 'Add'}
          </Button>
          <Button onClick={onClose} variant="secondary" className="w-full mt-2">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
