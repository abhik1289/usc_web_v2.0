"use client";

import React from "react";
import axios from "axios";

import  EventTable  from "@/components/(admin)/events/even-table";


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



export default function EventsPage() {
 
  

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Events</h1>
      </div>
      <EventTable/>
    </div>
  );
}
