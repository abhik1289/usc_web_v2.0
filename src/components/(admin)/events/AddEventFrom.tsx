"use client"
import { CardContent } from '@/components/ui/card'
import React, { useRef, useState } from 'react'
import {
    Form,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import InputFiled from '../InputFields/InputFiled';
import TextareaFiled from '../InputFields/TextareaFiled';

import { Button } from '@/components/ui/button';

import RadioInput from './Inputs/RadioInput';
import CalenderInput from './Inputs/CalenderInput';

import SwitchFiled from '../InputFields/SwitchFiled';
import SelectionFiled from '../InputFields/SelectionFiled';
import { Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { toast } from '@/hooks/use-toast';
import { useAddEvents } from '@/hooks/api/events/useAddEvents';

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
    startDate: z.any(),
    startTime: z.any(),
    endTime: z.any(),
    startTime1: z.string(),
    endTime1: z.string().optional().nullable(),
    startTime2: z.string().optional().nullable(),
    endTime2: z.string().optional().nullable(),
    startDate1: z.any().optional().nullable(),
    endDate1: z.any().optional().nullable(),
    startDate2: z.any().optional().nullable(),
    endDate2: z.any().optional().nullable(),
})
function AddEventFrom() {


    //ALL STATES
    const [image, setImage] = useState<string | null>(null);
    const [file, setFile] = useState<string | null>(null);
    const uploadImgRef = useRef<HTMLInputElement>(null);


    const events = useAddEvents();

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

    const durations = {
        data: [
            { id: 'SINGLE', title: 'Single Day' },
            { id: 'MULTIPLE', title: 'Multiple Days' },
        ]
    };
    //ALL FUNCTIONS
    const handleButtonClick = () => {
        uploadImgRef.current?.click();
    }
    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        setFile(file);
        if (file) {
            const reader: any = new FileReader();
            reader.onload = () => setImage(reader.result);
            reader.readAsDataURL(file);
        }
    };
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        if (!file) {
            toast({
                description: "Please upload an image",
                variant: "destructive",
            })
            return;
        }
        if (values.duration === 'MULTIPLE' && !values.endDate1 && !values.startTime2 && !values.endTime2 && !values.startDate1 && !values.endDate2 && !values.startDate2 && !values.endDate2) {
            toast({
                description: "Please fill all the fields",
                variant: "destructive",
            })
            return;
        }
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('location', values.location);
        formData.append('linkedinUrl', values.linkedinUrl);
        formData.append('instagramUrl', values.instagramUrl);
        formData.append('isPublic', values.isPublic.toString());
        formData.append('duration', values.duration);
        formData.append('startDate', values.startDate);
        formData.append('startTime', values.startTime);
        formData.append('endTime', values.endTime);
        formData.append('startTime1', values.startTime1);
        if (values.duration === 'MULTIPLE') {
            formData.append('endTime1', values.endTime1!);
            formData.append('startTime2', values.startTime2!);
            formData.append('endTime2', values.endTime2!);
            formData.append('startDate1', values.startDate1!);
            formData.append('endDate1', values.endDate1!);
            formData.append('startDate2', values.startDate2!);
            formData.append('endDate2', values.endDate2!);
        }
        formData.append('profilePhoto', file);
        events.mutate(formData);
    }


    return (
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex flex-wrap gap-4 w-full">
                        {image ? <div className="img_preview_container">
                            <div className="img_preview  w-[100px] h-[100px]  overflow-hidden">
                                <Image
                                    alt=""
                                    width={100}
                                    height={100}
                                    src={image}
                                />
                            </div>
                            <Button type="button" className="mt-2" onClick={handleButtonClick}>
                                <ImageIcon /> Change Image
                            </Button>

                        </div> : <Button type="button" onClick={handleButtonClick}>
                            <ImageIcon /> Upload Image

                        </Button>}
                        <div className="img_upload_ip">


                            <input
                                accept="image/*"
                                name={'profilePhoto'}
                                onChange={handleFileChange}
                                ref={uploadImgRef}
                                hidden
                                type="file"
                            />



                        </div>
                        <div className="flex w-full gap-4">
                            <InputFiled
                                name="title"
                                control={form.control}
                                placeholder="Enter event title"
                                label="Title"
                                disabled={events.isLoading}
                            />
                        </div>

                        <div className="flex w-full gap-4">
                            <TextareaFiled
                                name="description"
                                control={form.control}
                                placeholder="Enter a brief description of the event"
                                label="Description"
                                disabled={events.isLoading}

                            />
                        </div>

                        <div className="flex w-full gap-4">
                            <InputFiled
                                name="location"
                                control={form.control}
                                placeholder="Enter the event location"
                                label="Location"
                                disabled={events.isLoading}

                            />
                        </div>

                        <div className="flex w-full gap-4">
                            <SelectionFiled
                                control={form.control}
                                label='Event Duration'
                                name='duration'
                                disabled={events.isLoading}

                                infos={durations}
                                placeholder=''
                                notFound=''
                            />

                        </div>
                        {form.watch('duration') === 'SINGLE' ?
                            <div className="flex w-full gap-4 items-center">
                                <CalenderInput
                                    name='startDate'
                                    label='Selcet date'

                                    disabled={events.isLoading}
                                    control={form.control}
                                />
                                <InputFiled
                                    type='time'
                                    disabled={events.isLoading}
                                    control={form.control}
                                    name='startTime'
                                    placeholder=''
                                    label='Start Time'
                                />
                                <InputFiled
                                    type='time'
                                    disabled={events.isLoading}
                                    control={form.control}
                                    name='endTime'
                                    placeholder=''
                                    label='End Time'
                                />
                            </div> : <>
                                <div className="flex w-full gap-4 items-center">
                                    <CalenderInput
                                        disabled={events.isLoading}
                                        name='startDate1'
                                        label='Starting Date'
                                        control={form.control}
                                    />
                                    <InputFiled
                                        disabled={events.isLoading}
                                        type='time'
                                        control={form.control}
                                        name='startTime1'
                                        placeholder=''
                                        label='Start Time'
                                    />
                                    <InputFiled
                                        disabled={events.isLoading}
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
                                        disabled={events.isLoading}
                                        control={form.control}
                                    />
                                    <InputFiled
                                        disabled={events.isLoading}
                                        type='time'
                                        control={form.control}
                                        name='startTime2'
                                        placeholder=''
                                        label='Start Time'
                                    />
                                    <InputFiled
                                        type='time'
                                        disabled={events.isLoading}
                                        control={form.control}
                                        name='endTime2'
                                        placeholder=''
                                        label='End Time'
                                    />
                                </div>
                            </>}


                        <div className="flex w-full gap-4 items-center">
                            <SwitchFiled
                                disabled={events.isLoading}

                                control={form.control}
                                title="Make this event public?"
                                name="isPublic"
                            />
                        </div>
                        <div className="flex w-full gap-4">
                            <InputFiled
                                disabled={events.isLoading}

                                name="linkedinUrl"
                                control={form.control}
                                placeholder="https://linkedin.com/in/username"
                                label="LinkedIn URL"
                            />

                            <InputFiled
                                disabled={events.isLoading}

                                name="instagramUrl"
                                control={form.control}
                                placeholder="https://instagram.com/username"
                                label="Instagram URL"
                            />
                        </div>

                    </div>

                    <Button
                        disabled={events.isLoading}
                        type="submit" className="w-full">

                        {events.isLoading ? "Adding..." : "Add"}
                    </Button>
                </form>
            </Form>
        </CardContent>
    )
}

export default AddEventFrom