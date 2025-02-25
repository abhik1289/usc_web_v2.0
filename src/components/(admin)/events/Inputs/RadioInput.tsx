import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@radix-ui/react-label'

import React from 'react'
interface RadioInputProps {
    control: any;
    label: string;
    name: string;
}
function RadioInput({ control, label, name }: RadioInputProps) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <RadioGroup  >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem {...field}  value="SINGLE" id="r1" />
                                <Label htmlFor="r1">1 Day</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem  {...field} value="MULTIPLE" id="r2" />
                                <Label htmlFor="r2">2 Day</Label>
                            </div>
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default RadioInput