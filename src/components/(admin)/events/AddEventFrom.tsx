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
const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    dob: z.any()
})
function AddEventFrom() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            dob: ""
        },
    })
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex flex-wrap gap-4 w-full">
                        <div className="flex w-full gap-4">
                            <InputFiled
                                name="username"
                                control={form.control}
                                placeholder="John Doe"
                                label="Title"
                            />

                        </div>
                        <div className="flex w-full gap-4">
                            <TextareaFiled
                                name="username"
                                control={form.control}
                                placeholder="John Doe"
                                label="Description"
                            />

                        </div>
                        <div className="flex w-full gap-4">
                            <InputFiled
                                name="username"
                                control={form.control}
                                placeholder="John Doe"
                                label="Location"
                            />

                        </div>
                        <div className="flex w-full gap-4">
                            <RadioInput
                                control={form.control}
                                label='Event Duration'
                                name=''
                            />

                        </div>
                        <div className="flex w-full gap-4 items-center">
                            <CalenderInput control={form.control} />
                            <InputFiled type='time' control={form.control} name='' placeholder='' label='Start Time' />
                            <InputFiled type='time' control={form.control} name='' placeholder='' label='End Time' />
                        </div>
                    </div>
                </form>
            </Form>
        </CardContent>
    )
}

export default AddEventFrom