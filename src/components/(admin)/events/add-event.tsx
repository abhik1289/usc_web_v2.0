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

export default function EventForm() {
  const [eventType, setEventType] = useState<"singleDay" | "multiDay">(
    "singleDay"
  );
  const [selected, setSelected] = useState<Date>();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      eventType: "singleDay",
    },
  });

  const onSubmit = (data: EventFormValues) => {
    console.log(data);
    // Handle form submission here
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl mx-auto"
    >
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" {...register("title")} />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register("description")} />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="venue">Venue</Label>
        <Input id="venue" {...register("venue")} />
        {errors.venue && (
          <p className="text-red-500 text-sm mt-1">{errors.venue.message}</p>
        )}
      </div>

      <div>
        <Label>Event Type</Label>
        <Controller
          name="eventType"
          control={control}
          render={({ field }) => (
            <RadioGroup
              onValueChange={(value) => {
                field.onChange(value);
                setEventType(value as "singleDay" | "multiDay");
              }}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="singleDay" id="singleDay" />
                <Label htmlFor="singleDay">Single Day</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="multiDay" id="multiDay" />
                <Label htmlFor="multiDay">Multi-Day</Label>
              </div>
            </RadioGroup>
          )}
        />
      </div>

      {eventType === "singleDay" ? (
        <div>
          <Label>Date</Label>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <DayPicker
                  captionLayout="dropdown-months"
                  showOutsideDays 
                    mode="single"
                    selected={selected}
                    onSelect={setSelected}
                    
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <Label>Start Date</Label>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a start date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0"></PopoverContent>
                </Popover>
              )}
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.startDate.message}
              </p>
            )}
          </div>
          <div>
            <Label>End Date</Label>
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick an end date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    {/* <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    /> */}
                  </PopoverContent>
                </Popover>
              )}
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.endDate.message}
              </p>
            )}
          </div>
        </div>
      )}

      <div>
        <Label htmlFor="facebook">Facebook</Label>
        <Input
          id="facebook"
          {...register("facebook")}
          placeholder="https://facebook.com/yourevent"
        />
        {errors.facebook && (
          <p className="text-red-500 text-sm mt-1">{errors.facebook.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="twitter">Twitter</Label>
        <Input
          id="twitter"
          {...register("twitter")}
          placeholder="https://twitter.com/yourevent"
        />
        {errors.twitter && (
          <p className="text-red-500 text-sm mt-1">{errors.twitter.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="instagram">Instagram</Label>
        <Input
          id="instagram"
          {...register("instagram")}
          placeholder="https://instagram.com/yourevent"
        />
        {errors.instagram && (
          <p className="text-red-500 text-sm mt-1">
            {errors.instagram.message}
          </p>
        )}
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
}
