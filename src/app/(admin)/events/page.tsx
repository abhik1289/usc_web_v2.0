"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import axios from "axios";
import useSWR from "swr";
import  EventTable  from "@/components/(admin)/events/even-table";
const EventDialog = dynamic(
  () => import("@/components/(admin)/events/EventDialog"),
  {
    ssr: false,
  }
);

interface Event {
  id: number;
  title: string;
  location: string;
  date: any;
  displayType: boolean;
  eventType: string;
  startTime1: string;
  startTime2?: string;
  endTime1: string;
  endTime2?: string;
  startDate: string;
  endDate?: any;
}

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data.events;
};

export default function EventsPage() {
  // const [events, setEvents] = useState<Event[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const { data, error, isLoading } = useSWR("/api/event/all-events", fetcher);
  console.log(data);
  const handleDeleteEvent = (id: number) => {
    // setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Events</h1>
      
      </div>
      <EventTable/>
    </div>
  );
}
