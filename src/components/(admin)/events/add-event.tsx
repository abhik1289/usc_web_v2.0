"use client";


import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AddEventFrom from "./AddEventFrom";

export default function EventForm() {


 

 

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Event</CardTitle>
        <CardDescription>
          Fill out the form below to create a new event. Provide details like title, date, venue, and description to ensure all participants have the necessary information.
        </CardDescription>
      </CardHeader>
      <AddEventFrom />
    </Card>
  );
}
