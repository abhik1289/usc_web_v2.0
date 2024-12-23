"use client";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import React from 'react'
import { Input } from "@/components/ui/input";
import { Switch } from '@/components/ui/switch';


interface SwitchFiledProps {
    control: any;
    name: string;
    title: string;
    description: string;
    disabled?: boolean;
}

export default function SwitchFiled({ control, name, title, description, disabled }: SwitchFiledProps) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-1 flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                        <FormLabel>{title}</FormLabel>
                        <FormDescription>
                            {description}
                        </FormDescription>
                    </div>
                    <FormControl>
                        <Switch
                            disabled={disabled || false}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    )
}
