"use client";

import React from "react";


import EventTable from "@/components/(admin)/events/even-table";
import EventHeader from "@/components/(admin)/events/EventHeader";






export default function EventsPage() {



  return (
    <div className="p-6 space-y-6">
      <EventHeader />
      <EventTable />
    </div>
  );
}
