"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useGetDomainGroup } from "@/hooks/api/domain/useGetDomainGroup";
import { DomainAddForm } from "./DomainAddForm";
import { DomainEditForm } from "./DomainEditForm";

// Form validation schema

function AddDomain() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // Fetch Domain Details when `id` exists
  const {
    isLoading: domainLoading,
    data: domainData,
    error: domainError,
  } = useQuery({
    queryKey: ["domainDetails", id],
    queryFn: async () => {
      const res = await axios.get(`/api/domain/domain-details/${id}`);
      return res.data.message;
    },
    enabled: !!id,
  });

  // Insert or Update Domain Mutation

  // Form Hook

  return (
    <div className="p-4">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>{id ? "Edit Domain" : "Add Domain"}</CardTitle>
          <CardDescription>
            {id
              ? "Update your domain details."
              : "Organize and manage your domains effortlessly."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {domainData && id ? (
            <DomainEditForm
              id={id}
              defaultValues={{
                title: domainData.title,
                description: domainData.description,
                resourcesUrl: domainData?.resourcesUrl,
                domainGroupId: domainData?.groupOf,
                bannerUrl: domainData.bannerUrl,
              }}
            />
          ) : (
            <DomainAddForm
              defaultValues={{
                title: "",
                description: "",
                resourcesUrl: "",
                domainGroupId: "",
                bannerUrl: "https://example.com/banner.jpg",
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default AddDomain;
