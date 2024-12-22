"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useGetRoles } from "@/hooks/api/roles/useGetRoles";
import { useGetDomainGroup } from "@/hooks/api/domainDetails/useGetDomainGroup";
import { useGetDomainDetails } from "@/hooks/api/domainDetails/useGetDomainDetails";
import AddLeadForm from "./AddLeadForm";


function AddLead() {

  // const domainGroups = useGetDomainGroup();
  // const domainDetails = useGetDomainDetails();
  // console.log(domainDetails.data)
  return (
    <div className="p-2">
      <Card>
        <CardHeader>
          <CardTitle>Create New Lead</CardTitle>
          <CardDescription>
            Enter the details to add a new lead to the system.
          </CardDescription>
        </CardHeader>
        <AddLeadForm 
        defaultValues={{
          fullName: "",
          isCoreMember: false,
          isCurrent: true,
          profilePhoto: "",
          domainGroupId: "",
          domainNameId: "",
          // index: '',
          Social: {
            email: "",
            linkedinUrl: "",
            githubUrl: "",
            instagramUrl: "",
            portfolioUrl: "",
          },
        }} />

      </Card>
    </div>
  );
}

export default AddLead;
