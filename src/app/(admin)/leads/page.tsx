"use client";

import React, { useState } from "react";
import LeadsDialog from "@/components/(admin)/leads/LeadsDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGetLeads } from "@/hooks/api/leads/useGetLeads";
import LeadsTable from "@/components/(admin)/leads/LeadsTable";
import LeadsFilterBox from "@/components/(admin)/leads/LeadsFilterBox";

interface Lead {
  id: number;
  name: string;
  domainType: string;
  domainName: string;
  socials: string;
  photo: File | null;
}

export default function LeadsPage() {


  return (
    <div className=" p-4">
      <LeadsFilterBox />
      <LeadsTable /></div>
  );
}
