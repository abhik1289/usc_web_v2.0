import React, { useState, useEffect } from 'react';

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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {editingEvent ? 'Edit Event' : 'Add Event'}
        </h2>
        <input
          type="file"
          title="Upload Image"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          className="w-full mb-2"
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-2 p-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Venue"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          className="w-full mb-2 p-2 border border-gray-300 rounded"
        />
        <div className="mb-2">
          <label className="mr-2">
            <input
              type="radio"
              value="single"
              checked={dateType === 'single'}
              onChange={() => setDateType('single')}
            />
            Single Day
          </label>
          <label className="ml-4">
            <input
              type="radio"
              value="multiple"
              checked={dateType === 'multiple'}
              onChange={() => setDateType('multiple')}
            />
            Multiple Days
          </label>
        </div>
        {dateType === 'single' ? (
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full mb-2 p-2 border border-gray-300 rounded"
          />
        ) : (
          <>
            <input
              type="date"
              placeholder="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full mb-2 p-2 border border-gray-300 rounded"
            />
            <input
              type="date"
              placeholder="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full mb-2 p-2 border border-gray-300 rounded"
            />
          </>
        )}
        <input
          type="text"
          placeholder="Add Socials"
          value={socials}
          onChange={(e) => setSocials(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          {editingEvent ? 'Update' : 'Add'}
        </button>
        <button
          onClick={onClose}
          className="w-full mt-2 bg-gray-700 text-white py-2 rounded hover:bg-gray-800"
        >
          Cancel
        </button>
      </div>
    </div>
  );
} 