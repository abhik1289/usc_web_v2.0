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

interface Lead {
  id: number;
  name: string;
  domainType: string;
  domainName: string;
  socials: string;
  photo: File | null;
}

export default function LeadsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [filter, setFilter] = useState("all");

  const router = useRouter();
  const leadsInfo = useGetLeads();
  const leads = leadsInfo.data;

  const renderDomainBadge = (domainName: string) => {
    const isTech = domainName === "Tech";
    return (
      <span
        className={`px-2 py-1 rounded-full text-sm ${
          isTech ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
        }`}
      >
        {domainName}
      </span>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
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

      <div className="rounded-lg shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
        
              <TableCell>Domain Name</TableCell>
              <TableCell>Socials</TableCell>
              <TableCell>Core Member</TableCell>
              <TableCell>Profile Photo</TableCell>
              <TableCell>Photo</TableCell>

              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leadsInfo.isLoading ? (
              <TableRow>
                <TableCell className="text-center" colSpan={7}>
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              leads.map((lead: any, i: number) => (
                <TableRow key={lead.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{`${lead.fullName?.split(" ")[0]}${lead.isCurrent==false?" (F)":""}`}</TableCell>
     
                  <TableCell>{lead.domainName.title}</TableCell>
                  <TableCell>Avik</TableCell>
                  <TableCell>Avik</TableCell>

                  <TableCell>
                    {lead.isCoreMember ? lead.coreMemberPosition.title:'No'}
                   
                  </TableCell>
                  <TableCell>
                  
                     {lead.profilePhoto && (
                      <Image
                        width={100}
                        height={100}
                        src={lead.profilePhoto}
                        alt={lead.id}
                        className="h-16 w-16 object-cover rounded"
                      />
                    )} 
                  </TableCell>
                  <TableCell>
                  <div className="flex space-x-3">
                      <Button
                        variant="link"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="link"
                        className="text-red-500"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* {isDialogOpen && (
        <LeadsDialog
          onClose={() => {
            setIsDialogOpen(false);
            setEditingLead(null);
          }}
          editingLead={editingLead}
        />
      )} */}
    </div>
  );
}
