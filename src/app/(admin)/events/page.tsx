"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const EventDialog = dynamic(() => import("@/components/(admin)/events/EventDialog"), {
  ssr: false,
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

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const generateEventId = () => Date.now();

  const handleAddEvent = (newEvent: Event) => {
    setEvents([...events, { ...newEvent, id: generateEventId() }]);
  };

  const handleEditEvent = (updatedEvent: Event) => {
    setEvents(events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)));
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Events</h1>
        <Dialog open={isDialogOpen} onOpenChange={(open) => !open && setEditingEvent(null)}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingEvent(null);
                setIsDialogOpen(true);
              }}
              // variant="primary"
            >
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingEvent ? "Edit Event" : "Add Event"}</DialogTitle>
            </DialogHeader>
            <EventDialog
              onClose={() => {
                setIsDialogOpen(false);
                setEditingEvent(null);
              }}
              onAddEvent={handleAddEvent}
              onEditEvent={handleEditEvent}
              editingEvent={editingEvent}
            />
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Venue</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.id}</TableCell>
                <TableCell>{event.title}</TableCell>
                <TableCell>{event.date || `${event.startDate} - ${event.endDate}`}</TableCell>
                <TableCell>{event.venue}</TableCell>
                <TableCell>
                  {event.image && (
                    <img
                      src={URL.createObjectURL(event.image)}
                      alt={event.title}
                      className="h-16 w-16 object-cover rounded"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="link"
                      onClick={() => {
                        setEditingEvent(event);
                        setIsDialogOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
