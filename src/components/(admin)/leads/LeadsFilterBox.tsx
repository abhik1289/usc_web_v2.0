"use client"

import { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
function LeadsFilterBox() {
    const router = useRouter();
    const [filter, setFilter] = useState("all");
    return (
        <div className="flex justify-between items-center px-4">
            <h1 className="text-2xl font-bold">Core Members</h1>
            <div className="flex items-center space-x-4">
                <Select value={filter} onValueChange={(value) => setFilter(value)}>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter Leads" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Leads</SelectItem>
                        <SelectItem value="tech">Tech</SelectItem>
                        <SelectItem value="non-tech">Non-Tech</SelectItem>
                    </SelectContent>
                </Select>
                <Button onClick={() => router.push("/leads/add-lead")}>Add Lead</Button>
            </div>
        </div>
    )
}

export default LeadsFilterBox

