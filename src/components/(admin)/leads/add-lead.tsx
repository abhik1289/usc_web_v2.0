"use client";

import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import AddLeadForm from "./AddLeadForm";
import { useSearchParams } from "next/navigation";
import EditLeadForm from "./EditLeadForm";
import { useGetLeadById } from "@/hooks/api/leads/useGetLeadById";


function AddLead() {

  const params = useSearchParams();
  const id = params.get("id");
  const lead = useGetLeadById(id!);
  console.log(lead.data)
  return (
    <div className="p-2">
      <Card>
        <CardHeader>
          <CardTitle>{id ? "Edit Lead" : "Create New Lead"}</CardTitle>
          <CardDescription>
            {id ? "Update the details of the existing lead." : "Fill in the details to add a new lead to the system."}
          </CardDescription>
        </CardHeader>
        {id && lead.data ? <EditLeadForm
          defaultValues={{
            fullName: lead.data && lead.data.fullName,
            isCoreMember: lead.data && lead.data.isCoreMember,
            isCurrent: lead.data && lead.data.isCurrent,
            profilePhoto: lead.data && lead.data.profilePhoto,
            domainGroupId: lead.data && lead.data.domainGroupId,
            domainNameId: lead.data && lead.data.domainNameId,
            index: lead.data && lead.data.index,
            Social: {
              email: lead.data && lead.data.Social.email,
              linkedinUrl: lead.data && lead.data.Social.linkedinUrl,
              githubUrl: lead.data && lead.data.Social.githubUrl,
              instagramUrl: lead.data && lead.data.Social.instagramUrl,
              portfolioUrl: lead.data && lead.data.Social.portfolioUrl,
            },
          }}
        /> : <AddLeadForm
          defaultValues={{
            fullName: "",
            isCoreMember: false,
            isCurrent: true,
            profilePhoto: "https://avatar.iran.liara.run/public/girl",
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
          }} />}

      </Card>
    </div>
  );
}

export default AddLead;
