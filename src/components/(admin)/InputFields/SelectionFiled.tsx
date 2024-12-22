"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import React from 'react'
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';


interface SelectionFiledProps {
    control: any;
    name: string;
    placeholder: string;
    label: string;
    infos: any;
    notFound: string;
    defaultText: string;
}

export default function SelectionFiled({ control, name, placeholder, label, infos, notFound, defaultText }: SelectionFiledProps) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Select
                            onValueChange={field.onChange}
                            disabled={infos.isLoading}
                            {...field}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                                {infos.data && infos.data.length === 0 ? (
                                    <p>{notFound}</p>
                                ) : (
                                    <SelectGroup>
                                        <SelectLabel>{defaultText}</SelectLabel>
                                        {infos.data &&
                                            infos.data.map((item: any, i: number) => (
                                                <SelectItem key={i} value={item.id}>
                                                    {item.title}
                                                </SelectItem>
                                            ))}
                                    </SelectGroup>
                                )}
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
