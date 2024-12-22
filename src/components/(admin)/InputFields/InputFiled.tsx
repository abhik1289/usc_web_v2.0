"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import React from 'react'
import { Input } from "@/components/ui/input";


interface InputFiledProps {
    control: any;
    name: string;
    placeholder: string;
    label: string;
}

export default function InputFiled({ control, name, placeholder, label }: InputFiledProps) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
