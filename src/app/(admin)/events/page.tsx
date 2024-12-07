"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const EventDialog = dynamic(() => import('@/components/(admin)/events/EventDialog'), {
  ssr: false
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

  // Generate a unique ID for the new event.
  const generateEventId = () => Date.now();

  const handleAddEvent = (newEvent: Event) => {
    setEvents([...events, { ...newEvent, id: generateEventId() }]); // Ensure each event has a unique ID.
  };

  const handleEditEvent = (updatedEvent: Event) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Events</h1>
        <button
          onClick={() => {
            setEditingEvent(null);
            setIsDialogOpen(true);
          }}
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
        >
          Add Events
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-black text-left">ID</th>
              <th className="py-3 px-4 text-black text-left">Title</th>
              <th className="py-3 px-4 text-black text-left">Date</th>
              <th className="py-3 px-4 text-black text-left">Venue</th>
              <th className="py-3 px-4 text-black text-left">Image</th>
              <th className="py-3 px-4 text-black text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-b hover:bg-gray-50">
                <td className="py-3 text-black px-4">{event.id}</td>
                <td className="py-3 text-black px-4">{event.title}</td>
                <td className="py-3 text-black px-4">
                  {event.date || `${event.startDate} - ${event.endDate}`}
                </td>
                <td className="py-3 text-black px-4">{event.venue}</td>
                <td className="py-3 px-4">
                  {event.image && (
                    <img
                      src={URL.createObjectURL(event.image)}
                      alt={event.title}
                      className="h-16 w-16 object-cover rounded"
                    />
                  )}
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setEditingEvent(event);
                        setIsDialogOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isDialogOpen && (
        <EventDialog
          onClose={() => {
            setIsDialogOpen(false);
            setEditingEvent(null);
          }}
          onAddEvent={handleAddEvent}
          onEditEvent={handleEditEvent}
          editingEvent={editingEvent}
        />
      )}
    </div>
  );
}
