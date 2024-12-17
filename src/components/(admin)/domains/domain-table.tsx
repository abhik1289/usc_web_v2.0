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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getDomainGroups } from "./domainGroup-table";
import { useRouter } from "next/navigation";
export function DomainTable() {
  const [selectedDomainType, setSelectedDomainType] = useState("all");
  const [showDialog, setShowDialog] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  // Fetch Domain Data
  const {
    isLoading: domainLoading,
    error: domainError,
    data: domainData,
  } = useQuery({
    queryKey: ["domain"],
    queryFn: () =>
      axios.get("/api/domain/get-domains").then((res) => res.data.message),
  });

  // Fetch Domain Groups
  const {
    isLoading: domainGroupsLoading,
    error: domainGroupsError,
    data: domainGroups,
  } = useQuery({
    queryKey: ["domainGroup"],
    queryFn: () => getDomainGroups("/api/domain/get-domain-groups"),
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => axios.get(`/api/domain/delete-domain/${id}`),
    onSuccess: () => {
      toast({ description: "Domain Deleted Successfully" });
      queryClient.invalidateQueries(["domain"]);
      setShowDialog(false);
      setSelectedDeleteId(null);
    },
    onError: (error: any) => {
      toast({
        description: error.response?.data?.error || "An error occurred",
        variant: "destructive",
      });
    },
  });

 
  const handleDeleteDomain = (id: string) => {
    setShowDialog(true);
    setSelectedDeleteId(id);
  };

  const handleConfirmDelete = () => {
    if (selectedDeleteId) deleteMutation.mutate(selectedDeleteId);
  };

  const filteredDomains =
    domainData?.filter((domain: any) =>
      selectedDomainType === "all"
        ? true
        : domain.domainGroup.title === selectedDomainType
    ) || [];

  return (
    <Card>
      {/* Header */}
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Domains</h2>
        <Select
          disabled={domainGroupsLoading}
          onValueChange={setSelectedDomainType}
          value={selectedDomainType}
        >
          <SelectTrigger className="w-56">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {domainGroupsLoading ? (
              <SelectItem value="loading" disabled>
                Loading...
              </SelectItem>
            ) : domainGroupsError ? (
              <SelectItem value="error" disabled>
                Error loading domain groups
              </SelectItem>
            ) : (
              domainGroups?.map((group: { id: string; title: string }) => (
                <SelectItem key={group.id} value={group.title}>
                  {group.title}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </CardHeader>

      {/* Table */}
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
            {domainError ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Error Occurred
                </TableCell>
              </TableRow>
            ) : domainLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : filteredDomains.length > 0 ? (
              filteredDomains.map((domain: any, i: number) => (
                <TableRow key={domain.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        domain.domainGroup.title === "Tech"
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
                        onClick={() =>
                          router.push(`/domains/add-domain?id=${domain.id}`)
                        }
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this domain?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Deleting this domain will remove it
              permanently.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
