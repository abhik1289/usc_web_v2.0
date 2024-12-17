"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Dummy data for domains
const domains = [
  { id: 1, type: "tech", name: "Web Development" },
  { id: 2, type: "nonTech", name: "Content Writing" },
  { id: 3, type: "tech", name: "Machine Learning" },
  { id: 4, type: "nonTech", name: "Marketing" },
];

export function DomainTable() {
  const [selectedDomainType, setSelectedDomainType] = useState("all");

  // Filter logic
  const filteredDomains = domains.filter((domain) =>
    selectedDomainType === "all" ? true : domain.type === selectedDomainType
  );

  const handleEditDomain = (domain:any) => {
    console.log("Edit domain", domain);
  };

  const handleDeleteDomain = (id:any) => {
    console.log("Delete domain with id", id);
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Domains</h2>
        <Select
          onValueChange={setSelectedDomainType}
          value={selectedDomainType}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="tech">Tech</SelectItem>
            <SelectItem value="nonTech">Non-Tech</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDomains.map((domain) => (
              <TableRow key={domain.id}>
                <TableCell>{domain.id}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      domain.type === "tech"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {domain.type}
                  </span>
                </TableCell>
                <TableCell>{domain.name}</TableCell>
                <TableCell>
                  <div className="flex space-x-3">
                    <Button
                      variant="link"
                      onClick={() => handleEditDomain(domain)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="link"
                      className="text-red-500"
                      onClick={() => handleDeleteDomain(domain.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
