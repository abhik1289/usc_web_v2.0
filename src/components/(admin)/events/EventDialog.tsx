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
import { z } from "zod";

// Update validation schema to handle date validation
const eventSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(2, "Description must be at least 2 characters"),
  venue: z.string().min(2, "Venue must be at least 2 characters"),
  dateType: z.enum(['single', 'multiple'], {
    required_error: "Please select a date type",
  }),
  date: z.string().optional()
    .refine((date) => {
      if (!date) return true; // Allow empty if not single date
      return Date.parse(date) >= Date.now() - 86400000; // Within last 24 hours
    }, "Date must not be in the past"),
  startDate: z.string().optional()
    .refine((date) => {
      if (!date) return true; // Allow empty if not multiple dates
      return Date.parse(date) >= Date.now() - 86400000;
    }, "Start date must not be in the past"),
  endDate: z.string().optional()
    .refine((date, ctx) => {
      if (!date) return true;
      const startDate = ctx.parent.startDate;
      if (!startDate) return true;
      return Date.parse(date) >= Date.parse(startDate);
    }, "End date must be after start date"),
  socials: z.string().optional(),
  image: z.instanceof(File).nullable(),
});

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

// Update FormErrors interface to include dateType
interface FormErrors {
  title?: string;
  description?: string;
  venue?: string;
  dateType?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  socials?: string;
  image?: string;
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
  const [errors, setErrors] = useState<FormErrors>({});

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

  const validateForm = () => {
    try {
      const formData = {
        title,
        description,
        venue,
        dateType,
        date: dateType === 'single' ? date : undefined,
        startDate: dateType === 'multiple' ? startDate : undefined,
        endDate: dateType === 'multiple' ? endDate : undefined,
        socials,
        image,
      };

      eventSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: FormErrors = {};
        error.errors.forEach((err) => {
          if (err.path) {
            formattedErrors[err.path[0] as keyof FormErrors] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

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
        <div>
          <Input
            type="file"
            title="Upload Image"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setImage(e.target.files ? e.target.files[0] : null)
            }
            className="w-full mb-2"
          />
          {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
        </div>

        <div>
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            className="w-full mb-2"
          />
          {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
        </div>

        <div>
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            className="w-full mb-2"
          />
          {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
        </div>

        <div>
          <Input
            type="text"
            placeholder="Venue"
            value={venue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVenue(e.target.value)}
            className="w-full mb-2"
          />
          {errors.venue && <p className="text-sm text-red-500">{errors.venue}</p>}
        </div>

        <div className="mb-2">
          <RadioGroup 
            value={dateType} 
            onValueChange={setDateType} 
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="single" id="single" />
              <Label htmlFor="single">Single Day</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="multiple" id="multiple" />
              <Label htmlFor="multiple">Multiple Days</Label>
            </div>
          </RadioGroup>
          {errors.dateType && <p className="text-sm text-red-500">{errors.dateType}</p>}
        </div>

        {dateType === 'single' ? (
          <div>
            <Input
              type="date"
              value={date}
              min={new Date().toISOString().split('T')[0]} // Set minimum date to today
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
              className="w-full mb-2"
            />
            {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
          </div>
        ) : (
          <>
            <div>
              <Input
                type="date"
                placeholder="Start Date"
                value={startDate}
                min={new Date().toISOString().split('T')[0]} // Set minimum date to today
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)}
                className="w-full mb-2"
              />
              {errors.startDate && <p className="text-sm text-red-500">{errors.startDate}</p>}
            </div>
            <div>
              <Input
                type="date"
                placeholder="End Date"
                value={endDate}
                min={startDate || new Date().toISOString().split('T')[0]} // Set minimum to start date or today
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)}
                className="w-full mb-2"
              />
              {errors.endDate && <p className="text-sm text-red-500">{errors.endDate}</p>}
            </div>
          </>
        )}

        <div>
          <Input
            type="text"
            placeholder="Add Socials"
            value={socials}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSocials(e.target.value)}
            className="w-full mb-4"
          />
          {errors.socials && <p className="text-sm text-red-500">{errors.socials}</p>}
        </div>

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
