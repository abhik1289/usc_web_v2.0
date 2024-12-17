"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { toast } from "@/hooks/use-toast";
import axios from "axios";

// Form validation schema
const formSchema = z.object({
  title: z
    .string()
    .min(4, { message: "Title must be at least 4 characters long." })
    .max(20, { message: "Title must not exceed 20 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long." })
    .max(100, { message: "Description must not exceed 100 characters." }),
  resourcesUrl: z.string().optional(),
  domainGroupId: z
    .string({ required_error: "Please select a domain group." })
    .min(1),
  bannerUrl: z.string().url("Banner URL must be a valid URL."),
});

function AddDomain() {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // Fetch Domain Groups
  const {
    isLoading: groupsLoading,
    error: groupsError,
    data: domainGroups,
  } = useQuery({
    queryKey: ["domainGroups"],
    queryFn: async () => {
      const res = await axios.get("/api/domain/get-domain-groups");
      return res.data.domainGroups
      ;
    },
  });
console.log(domainGroups)
  // Fetch Domain Details when `id` exists
  const {
    isLoading: domainLoading,
    data: domainData,
    error: domainError,
  } = useQuery({
    queryKey: ["domain", id],
    queryFn: async () => {
      const res = await axios.get(`/api/domain/domain-details/${id}`);
      return res.data.message;
    },
    enabled: !!id,
  });
  console.log(domainData);
  // Insert or Update Domain Mutation
  const insertMutation = useMutation({
    mutationFn: async (data: any) => {
      const { title, description, bannerUrl, resourcesUrl, domainGroupId } =
        data;
      const url = id
        ? `/api/domain/update-domainDetails/${id}`
        : `/api/domain/add-domainDetails`;

      const res = await axios.post(url, {
        title,
        description,
        bannerUrl,
        url: resourcesUrl,
        groupOf: domainGroupId,
      });
      return res.data;
    },
    onMutate: () => setLoading(true),
    onSuccess: () => {
      toast({
        description: id
          ? "Domain updated successfully!"
          : "Domain added successfully!",
      });
      queryClient.invalidateQueries(["domainGroups"]);
      queryClient.invalidateQueries(["domain"]);
     setLoading(true);
    },
    onError: (error: any) => {
      toast({
        description: error.response?.data?.error || "An error occurred",
        variant: "destructive",
      });
     setLoading(true);
    },
  });

  // Form Hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title:  "y",
      description:   "",
      resourcesUrl: "",
      domainGroupId: "",
      bannerUrl: "https://example.com/banner.jpg",
    },
  });
  console.log(form);
  // Reset form values when domain data is fetched
  useEffect(() => {
    if (domainData) {
      
      
    }
  }, [domainData, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    insertMutation.mutate(values);
  };

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter domain title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Resources URL */}
              <FormField
                control={form.control}
                name="resourcesUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resources URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Domain Group Selector */}
              {/* Domain Group Selector */}
              <FormField
                control={form.control}
                name="domainGroupId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Domain Group</FormLabel>
                    <FormControl>
                      <Select
                        disabled={loading}
                        onValueChange={field.onChange}
                        defaultValue={domainData?domainData.domainGroup.title:field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Domain Group" />
                        </SelectTrigger>
                        <SelectContent>
                          {groupsLoading ? (
                            <SelectItem value="loading" disabled>
                              Loading...
                            </SelectItem>
                          ) : groupsError ? (
                            <SelectItem value="error" disabled>
                              Error loading domain groups
                            </SelectItem>
                          ) : (
                            domainGroups &&
                            domainGroups.map(
                              (group: { id: string; title: string }) => (
                                <SelectItem key={group.id} value={group.id}>
                                  {group.title}
                                </SelectItem>
                              )
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Banner URL */}
              <FormField
                control={form.control}
                name="bannerUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Banner URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/banner.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={insertMutation.isLoading}
                className="w-full"
              >
                {insertMutation.isLoading
                  ? "Submitting..."
                  : id
                  ? "Update"
                  : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddDomain;

