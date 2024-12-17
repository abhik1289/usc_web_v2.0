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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getDomainGroups } from "./domainGroup-table";


export function DomainTable() {
  const [selectedDomainType, setSelectedDomainType] = useState("all");
  const [loading, setLoading] = useState(false);

  // Filter logic

  const handleEditDomain = (domain: any) => {
    console.log("Edit domain", domain);
  };

  const handleDeleteDomain = (id: any) => {
    console.log("Delete domain with id", id);
  };
  const {
    isLoading: domainLoading,
    error: domainError,
    data: domainData,
  } = useQuery({
    queryKey: ["domain"],
    queryFn: () =>
      axios
        .get("/api/domain/get-domains")
        .then((response) => response.data.message),
  });
  console.log(domainData);
  const filteredDomains =
    domainData &&
    domainData.filter((domain: any) =>
      selectedDomainType === "all"
        ? true
        : domain.domainGroup.title === selectedDomainType
    );
  const {
    isLoading,
    error,
    data: domainGroups,
  } = useQuery({
    queryKey: ["domainGroup"],
    queryFn: () => getDomainGroups("/api/domain/get-domain-groups"),
  });
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Domains</h2>
        <Select
          disabled={loading}
          onValueChange={setSelectedDomainType}
          value={selectedDomainType}
          defaultValue="all"
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            {isLoading ? (
              <SelectItem value="loading" disabled>
                Loading...
              </SelectItem>
            ) : error ? (
              <SelectItem value="error" disabled>
                Error loading domain groups
              </SelectItem>
            ) : (
              domainGroups &&
              domainGroups.map((group: { id: string; title: string }) => (
                <SelectItem key={group.id} value={group.title}>
                  {group.title}
                </SelectItem>
              ))
            )}
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
            {domainError && (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Error Occurred
                </TableCell>
              </TableRow>
            )}
            {
              domainLoading && <TableRow>
              <TableCell colSpan={4} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
            }
            {!domainLoading && filteredDomains && filteredDomains.length > 0 ? (
              filteredDomains.map((domain: any, i: number) => (
                <TableRow key={domain.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        domain.type === "tech"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {domain.domainGroup.title}
                    </span>
                  </TableCell>
                  <TableCell>{domain.title}</TableCell>
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
