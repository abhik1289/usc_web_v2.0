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
import CalenderInput from './Inputs/CalenderInput';
import SwitchFiled from '../InputFields/SwitchFiled';
import SelectionFiled from '../InputFields/SelectionFiled';
import { Edit2Icon, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { toast } from '@/hooks/use-toast';
import { useAddEvents } from '@/hooks/api/events/useAddEvents';
import { useUpdateEvent } from '@/hooks/api/events/useUpadteEvents';
import { durations, EvenFormSchema } from './AddEventFrom';



interface AddEventFromProps {
    defaultValues: z.infer<typeof EvenFormSchema>,
    disable: boolean,
    bannerUrl: string,
    eId: string
}

function EditEventFrom({ defaultValues, disable, bannerUrl, eId }: AddEventFromProps) {


    //ALL STATES
    const [image, setImage] = useState<string | null>(null);
    const [file, setFile] = useState<string | null>(null);
    const uploadImgRef = useRef<HTMLInputElement>(null);


    const events = useUpdateEvent(eId);

    const form = useForm<z.infer<typeof EvenFormSchema>>({
        resolver: zodResolver(EvenFormSchema),
        defaultValues
    })


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
    function onSubmit(values: z.infer<typeof EvenFormSchema>) {

        if (values.duration === 'MULTIPLE' && (!values.startTime2 || !values.endTime2 || !values.startDate1 || !values.startDate2 || !values.startTime1 || !values.startTime2)) {
            toast({
                description: "Please fill all the fields",
                variant: "destructive",
            })
            return;
        } else if (values.duration === "ONLINE" && (!values.startDateO || !values.endDateO)) {
            toast({
                description: "Please fill start and end Date",
                variant: "destructive",
            });
            return;
        } else if (values.duration === "SINGLE" && (!values.startDate || !values.startTime || !values.endTime)) {
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
        if (values.duration === "SINGLE") {
            formData.append('startDate', values.startDate);
            formData.append('startTime', values.startTime);
            formData.append('endTime', values.endTime);
        } else if (values.duration === 'MULTIPLE') {
            formData.append('startTime1', values.startTime1);
            formData.append('endTime1', values.endTime1!);
            formData.append('startTime2', values.startTime2!);
            formData.append('endTime2', values.endTime2!);
            formData.append('startDate1', values.startDate1!);
            formData.append('startDate2', values.startDate2!);
        } else {
            //THIS IS FOR VIRTUAL EVENT
            formData.append('startDateO', values.startDateO);
            formData.append('endDateO', values.endDateO);
        }
        formData.append('profilePhoto', file!);
        events.mutate(formData, {
            onSuccess: () => {
                // form.reset();
            }
        });
    }
    console.log(form.formState.errors)

    return (
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex flex-wrap gap-4 w-full">
                        {bannerUrl && (
                            <div className="flex flex-col">
                                <div className="image w-[100px] h-[100px] relative">
                                    <Image
                                        width={100}
                                        height={100}
                                        // className="rounded-full"
                                        alt={defaultValues.title}
                                        src={image ? image : bannerUrl}
                                    />
                                </div>
                                <div className="edit_btn mt-2">
                                    <Button
                                        onClick={handleButtonClick}
                                        type="button"
                                        className="w-[70px]"
                                    >
                                        <Edit2Icon size={20} />
                                        Edit
                                    </Button>
                                    <div className="img_upload_ip">


                                        <input
                                            accept="image/*"
                                            name={'photoUrl'}
                                            onChange={handleFileChange}
                                            ref={uploadImgRef}
                                            hidden
                                            type="file"
                                        />



                                    </div>
                                </div>
                            </div>
                        )}
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
                                disabled={events.isLoading || disable}
                            />
                        </div>

                        <div className="flex w-full gap-4">
                            <TextareaFiled
                                name="description"
                                control={form.control}
                                placeholder="Enter a brief description of the event"
                                label="Description"
                                disabled={events.isLoading || disable}


                            />
                        </div>

                        <div className="flex w-full gap-4">
                            <InputFiled
                                name="location"
                                control={form.control}
                                placeholder="Enter the event location"
                                label="Location"
                                disabled={events.isLoading || disable}


                            />
                            <InputFiled
                                name="index"
                                control={form.control}
                                placeholder="0/1/.."
                                label="Sequence Number"
                                disabled={events.isLoading || disable}
                            />
                        </div>

                        <div className="flex w-full gap-4">
                            <SelectionFiled
                                control={form.control}
                                label='Event Duration'
                                name='duration'
                                disabled={events.isLoading || disable}


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

                                    disabled={events.isLoading || disable}

                                    control={form.control}
                                />
                                <InputFiled
                                    type='time'
                                    disabled={events.isLoading || disable}

                                    control={form.control}
                                    name='startTime'
                                    placeholder=''
                                    label='Start Time'
                                />
                                <InputFiled
                                    type='time'
                                    disabled={events.isLoading || disable}

                                    control={form.control}
                                    name='endTime'
                                    placeholder=''
                                    label='End Time'
                                />
                            </div> : <>
                                <div className="flex w-full gap-4 items-center">
                                    <CalenderInput
                                        disabled={events.isLoading || disable}

                                        name='startDate1'
                                        label='Starting Date'
                                        control={form.control}
                                    />
                                    <InputFiled
                                        disabled={events.isLoading || disable}

                                        type='time'
                                        control={form.control}
                                        name='startTime1'
                                        placeholder=''
                                        label='Start Time'
                                    />
                                    <InputFiled
                                        disabled={events.isLoading || disable}

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
                                        disabled={events.isLoading || disable}

                                        control={form.control}
                                    />
                                    <InputFiled
                                        disabled={events.isLoading || disable}

                                        type='time'
                                        control={form.control}
                                        name='startTime2'
                                        placeholder=''
                                        label='Start Time'
                                    />
                                    <InputFiled
                                        type='time'
                                        disabled={events.isLoading || disable}

                                        control={form.control}
                                        name='endTime2'
                                        placeholder=''
                                        label='End Time'
                                    />
                                </div>
                            </>}


                        <div className="flex w-full gap-4 items-center">
                            <SwitchFiled
                                disabled={events.isLoading || disable}


                                control={form.control}
                                title="Make this event public?"
                                name="isPublic"
                            />
                        </div>
                        <div className="flex w-full gap-4">
                            <InputFiled
                                disabled={events.isLoading || disable}


                                name="linkedinUrl"
                                control={form.control}
                                placeholder="https://linkedin.com/in/username"
                                label="LinkedIn URL"
                            />

                            <InputFiled
                                disabled={events.isLoading || disable}


                                name="instagramUrl"
                                control={form.control}
                                placeholder="https://instagram.com/username"
                                label="Instagram URL"
                            />
                        </div>

                    </div>

                    <Button
                        disabled={events.isLoading || disable}

                        type="submit" className="w-full">

                        {events.isLoading ? "Updating..." : "Update"}
                    </Button>
                </form>
            </Form>
        </CardContent>
    )
}

export default EditEventFrom