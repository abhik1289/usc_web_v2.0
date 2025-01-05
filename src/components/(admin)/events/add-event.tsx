"use client";


import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AddEventFrom from "./AddEventFrom";
import { useSearchParams } from "next/navigation";
import useGetEventById from "@/hooks/api/events/useGetEventById";
export default function EventForm() {


  const params = useSearchParams();
  const id = params.get("id");

  const event = useGetEventById(id);

  //



  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Event</CardTitle>
        <CardDescription>
          Fill out the form below to create a new event. Provide details like title, date, venue, and description to ensure all participants have the necessary information.
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
