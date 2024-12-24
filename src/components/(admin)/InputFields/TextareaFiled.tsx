"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import React from 'react'
import { Input } from "@/components/ui/input";
import { Textarea } from '@/components/ui/textarea';


interface InputFiledProps {
    control: any;
    name: string;
    placeholder: string;
    label: string;
    disabled?: boolean;
}

export default function TextareaFiled({ control, name, placeholder, label, disabled }: InputFiledProps) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Textarea disabled={disabled || false} placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
