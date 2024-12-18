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
interface Lead {
  id: number;
  name: string;
  domainType: string;
  domainName: string;
  socials: string;
  photo: File | null;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [filter, setFilter] = useState("all");

  const handleAddLead = (newLead: Lead) => {
    setLeads((prevLeads) => [...prevLeads, newLead]);
  };

  const handleEditLead = (updatedLead: Lead) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead))
    );
  };

  const handleDeleteLead = (id: number) => {
    setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== id));
  };

  const filteredLeads = leads.filter((lead) => {
    if (filter === "all") return true;
    if (filter === "tech") return lead.domainType === "Tech";
    if (filter === "non-tech") return lead.domainType === "Non-Tech";
    return true;
  });

  const router = useRouter();

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

      <div className=" rounded-lg shadow-md">
        <Table>
          <TableHeader>
            <TableRow className=" ">
              {[
                "ID",
                "Name",
                "Domain Type",
                "Domain Name",
                "Socials",
                "Photo",
                "Actions",
              ].map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="text-black">
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>{lead.id}</TableCell>
                <TableCell>{lead.name}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      lead.domainType === "Tech"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {lead.domainType}
                  </span>
                </TableCell>
                <TableCell>{lead.domainName}</TableCell>
                <TableCell>{lead.socials}</TableCell>
                <TableCell>
                  {lead.photo && (
                    <Image
                      width={100}
                      height={100}
                      src={URL.createObjectURL(lead.photo)}
                      alt={lead.name}
                      className="h-16 w-16 object-cover rounded"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      className="text-black"
                      variant="link"
                      onClick={() => {
                        setEditingLead(lead);
                        setIsDialogOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteLead(lead.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {isDialogOpen && (
        <LeadsDialog
          onClose={() => {
            setIsDialogOpen(false);
            setEditingLead(null);
          }}
          onAddLead={handleAddLead}
          onEditLead={handleEditLead}
          editingLead={editingLead}
        />
      )}
    </div>
  );
}
