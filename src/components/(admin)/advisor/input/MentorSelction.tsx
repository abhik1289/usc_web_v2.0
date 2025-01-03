"use client";

import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MentorOrAdvisorProps {
  control: any;
  name: string;
  placeholder: string;
  label: string;
  infos: String[];
  notFound?: string;
  defaultText: string;
  filterdata?: any;
  disabled?: boolean;
  defaultValue?: string;
}

export default function MentorOrAdvisor({
  control,
  name,
  placeholder,
  label,
  infos,
  notFound = "No options available",
  defaultText,
  disabled = false,
}: MentorOrAdvisorProps) {
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
              disabled={disabled}
            //   defaultValue={field.value || defaultText}
              {...field}
            >
              <SelectTrigger>
              <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{label}</SelectLabel>
                  {infos.length > 0 ? (
                    infos.map((item: any, i: number) => (
                      <SelectItem key={i} value={item}>
                        {item}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="" disabled>{notFound}</SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
