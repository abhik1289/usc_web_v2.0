"use client"
import { CardContent } from '@/components/ui/card'
import React from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import InputFiled from '../InputFields/InputFiled';
import TextareaFiled from '../InputFields/TextareaFiled';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from "date-fns"
import RadioInput from './Inputs/RadioInput';
import CalenderInput from './Inputs/CalenderInput';
import SelectionFiled from '../InputFields/SelectionFiled';
import SwitchFiled from '../InputFields/SwitchFiled';
import { start } from 'repl';
const formSchema = z.object({
    title: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    description: z.string(),
    location: z.string(),
    linkedinUrl: z.string().url(),
    instagramUrl: z.string().url(),
    isPublic: z.boolean(),
    duration: z.enum(['SINGLE', 'MULTIPLE']),
    startDate: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    startTime1: z.string(),
    endTime1: z.string().optional().nullable(),
    startTime2: z.string().optional().nullable(),
    endTime2: z.string().optional().nullable(),
    startDate1: z.string().optional().nullable(),
    endDate1: z.string().optional().nullable(),
    startDate2: z.string().optional().nullable(),
    endDate2: z.string().optional().nullable(),
})
function AddEventFrom() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
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

        },
    })
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
console.log(form.getValues('duration'))
    return (
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex flex-wrap gap-4 w-full">
                        <div className="flex w-full gap-4">
                            <InputFiled
                                name="title"
                                control={form.control}
                                placeholder="Enter event title"
                                label="Title"
                            />
                        </div>

                        <div className="flex w-full gap-4">
                            <TextareaFiled
                                name="description"
                                control={form.control}
                                placeholder="Enter a brief description of the event"
                                label="Description"
                            />
                        </div>

                        <div className="flex w-full gap-4">
                            <InputFiled
                                name="location"
                                control={form.control}
                                placeholder="Enter the event location"
                                label="Location"
                            />
                        </div>

                        <div className="flex w-full gap-4">
                            <RadioInput
                                control={form.control}
                                label='Event Duration'
                                name='duration'
                            />

                        </div>
                        {form.getValues('duration') === 'SINGLE' ?
                            <div className="flex w-full gap-4 items-center">
                                <CalenderInput
                                    name='startDate'
                                    label='Selcet date'
                                    control={form.control}
                                />
                                <InputFiled
                                    type='time'
                                    control={form.control}
                                    name='startTime'
                                    placeholder=''
                                    label='Start Time'
                                />
                                <InputFiled
                                    type='time'
                                    control={form.control}
                                    name='endTime'
                                    placeholder=''
                                    label='End Time'
                                />
                            </div> : <>
                                <div className="flex w-full gap-4 items-center">
                                    <CalenderInput
                                        name='startDate1'
                                        label='Starting Date'
                                        control={form.control}
                                    />
                                    <InputFiled
                                        type='time'
                                        control={form.control}
                                        name='startTime1'
                                        placeholder=''
                                        label='Start Time'
                                    />
                                    <InputFiled
                                        type='time'
                                        control={form.control}
                                        name='endTime1'
                                        placeholder=''
                                        label='End Time'
                                    />
                                </div>
                                <div className="flex w-full gap-4 items-center">
                                    <CalenderInput
                                        name='startDate2'
                                        label='End Date'
                                        control={form.control}
                                    />
                                    <InputFiled
                                        type='time'
                                        control={form.control}
                                        name='startDate2'
                                        placeholder=''
                                        label='Start Time'
                                    />
                                    <InputFiled type='time'
                                        control={form.control}
                                        name='endDate2'
                                        placeholder=''
                                        label='End Time'
                                    />
                                </div>
                            </>}


                        <div className="flex w-full gap-4 items-center">
                            <SwitchFiled
                                control={form.control}
                                title="Make this event public?"
                                name="isPublic"
                            />
                        </div>
                        <div className="flex w-full gap-4">
                            <InputFiled
                                name="linkedinUrl"
                                control={form.control}
                                placeholder="https://linkedin.com/in/username"
                                label="LinkedIn URL"
                            />

                            <InputFiled
                                name="instagramUrl"
                                control={form.control}
                                placeholder="https://instagram.com/username"
                                label="Instagram URL"
                            />
                        </div>

                    </div>
                    <Button type="submit" className="w-full">Add Event</Button>
                </form>
            </Form>
        </CardContent>
    )
}

export default AddEventFrom