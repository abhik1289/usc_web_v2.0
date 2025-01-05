"use client";


import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AddEventFrom from "./AddEventFrom";
import { useSearchParams } from "next/navigation";
import useGetEventById from "@/hooks/api/events/useGetEventById";
export default function EventForm() {


  const params = useSearchParams();
  const id = params.get("id");

  const event = useGetEventById(id);

  //Dynamic event title and description
  const title = id ? `Edit Event: ${event.data.event.title}` : 'Add New Event';
  const description = id ? `Edit the details for event "${event.data.event.title}"` : 'Create a new event';



  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <AddEventFrom defaultValues={{
        title: "",
        description: "",
        location: "",
        linkedinUrl: "",
        instagramUrl: "",
        isPublic: false,
        duration: 'SINGLE',
        startDate: "",
        startTime: "",
        endTime: "",
        startTime1: "",
        endTime1: "",
        startTime2: "",
        endTime2: "",
        startDate1: "",
        endDate1: "",
        startDate2: "",
        endDate2: "",
      }} />
    </Card>
  );
}
