"use client";


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AddEventFrom from "./AddEventFrom";
import { useSearchParams } from "next/navigation";
import useGetEventById from "@/hooks/api/events/useGetEventById";
import EditEventFrom from "./EditEventFrom";
export default function EventForm() {


  const params = useSearchParams();
  const id = params.get("id");

  const event = useGetEventById(id);
  console.log(event)
  //Dynamic event title and description
  const title = id ? `Edit Event: ${event.data && event.data.title}` : 'Add New Event';
  const description = id ? `Edit the details for event "${event.data && event.data.title}"` : 'Create a new event';


  if (id && event.data === null) {
    return <div className=" w-[350px] italic">
      <p>
        No event is found. Invalid Id
      </p>
    </div>
  }



  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>

      {

        id && event.data ? <EditEventFrom
          defaultValues={{
            title: event.data && event.data.title,
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
          }}
          disable={event.isLoading}
        /> :
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
          }} />}
    </Card>
  );

}
