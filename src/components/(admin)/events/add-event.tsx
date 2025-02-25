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
  // console.log(event.data)
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
  console.log(event.data?.eventDateSingle)
  // const { endTime, startDate, startTime } = event.data && event.data?.eventDateSingle;
  // const { startDate1, startDate2, endTime1, endTime2 } = event.data && event.data.eventDateMultitle;

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
            description: event.data && event.data.description,
            location: event.data && event.data.location,
            linkedinUrl: event.data && event.data.socialMedia[0],
            instagramUrl: event.data && event.data.socialMedia[1],
            isPublic: event.data && event.data.displayType === "PRIVATE" ? false : true,
            duration: event.data && event.data.eventType,
            //THIS IS FOR SINGLE DAY EVENT
            startDate: event.data && event.data.eventType === "SINGLE" ? event.data.eventDateSingle.startDate : "",
            startTime: event.data && event.data.eventType === "SINGLE" ? event.data.eventDateSingle.startTime : "",
            endTime: event.data && event.data.eventType === "SINGLE" ? event.data.eventDateSingle.endTime : "",
            //THIS IS FOR MULTIPLE DAY EVENT
            startDate1: event.data && event.data.eventType === "MULTIPLE" ? event.data.eventDateMultitle.startDate1 : "",
            startDate2: event.data && event.data.eventType === "MULTIPLE" ? event.data.eventDateMultitle.startDate2 : "",
            startTime1: event.data && event.data.eventType === "MULTIPLE" ? event.data.eventDateMultitle.startTime1 : "",
            endTime1: event.data && event.data.eventType === "MULTIPLE" ? event.data.eventDateMultitle.endTime1 : "",
            startTime2: event.data && event.data.eventType === "MULTIPLE" ? event.data.eventDateMultitle.startTime2 : "",
            endTime2: event.data && event.data.eventType === "MULTIPLE" ? event.data.eventDateMultitle.endTime2 : "",
            index: event.data && event.data.index?.toString() || '0',
            startDateO: event.data && event.data.eventType === "ONLINE" ? event.data?.eventVirtual?.startDate : "",
            endDateO: event.data && event.data.eventType === "ONLINE" ? event.data?.eventVirtual?.endDate : "",
          }}
          bannerUrl={event.data && event.data.banner_url}
          disable={event.isLoading}
          eId={id}
        /> :
          <AddEventFrom
            defaultValues={{
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
              // endDate1: "",
              startDate2: "",
              startDateO: "",
              endDateO: ""
              // endDate2: "",
            }}
          />}
    </Card>
  );

}
