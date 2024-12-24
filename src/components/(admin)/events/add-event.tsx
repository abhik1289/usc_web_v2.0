"use client";

import { useState } from "react";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema, EventFormValues } from "@/schemas/events/event.shema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
// import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
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
