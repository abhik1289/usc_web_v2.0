"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
import { getDomainGroups } from "./domainGroup-table";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";

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
    .string({
      required_error: "Please select a domain group from the list.",
    })
    .min(1),
  bannerUrl: z.string().url("Banner URL must be a valid URL."),
});

function AddDomain() {
  const [loading, setLoading] = useState(false);
  const insertDomain = async (data: any) => {
    const { title, description, bannerUrl, resourcesUrl, domainGroupId } = data;
    const res = await axios.post(`/api/domain/add-domainDetails`, {
      title,
      description,
      bannerUrl,
      url: resourcesUrl,
      groupOf: domainGroupId,
    });
    return res.data;
  };
  const queryClient = useQueryClient();
  const insertMutation = useMutation({
    mutationFn: insertDomain,
    onMutate: () => setLoading(true),
    onSuccess: () => {
      toast({
        description: "Domain added successfully!",
      });
      queryClient.invalidateQueries(["domain"]); // Optional: Invalidate roles query to refetch data
      setLoading(false);
    },
    onError: (error: any) => {
      toast({
        description: error.response?.data?.error || "An error occurred",
        variant: "destructive",
      });
      setLoading(false);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      resourcesUrl: "",
      domainGroupId: "",
      bannerUrl: "https://example.com/banner.jpg",
    },
  });

  const {
    isLoading,
    error,
    data: domainGroups,
  } = useQuery({
    queryKey: ["domainGroup"],
    queryFn: () => getDomainGroups("/api/domain/get-domain-groups"),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const data = {
      title: values.title,
      description: values.description,
      resourcesUrl: values.resourcesUrl,
      domainGroupId: values.domainGroupId,
      bannerUrl: values.bannerUrl,
    };

    insertMutation.mutate(data);
  };
  const searchParams = useSearchParams()
 
  const id = searchParams.get('id');
  console.log(id)

  return (
    <div className="p-4">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Add Domain</CardTitle>
          <CardDescription>
            Organize and manage your domains effortlessly.
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
                      <Input
                        disabled={loading}
                        placeholder="Enter domain title"
                        {...field}
                      />
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
                      <Textarea
                        disabled={loading}
                        placeholder="Enter description"
                        {...field}
                      />
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
                      <Input
                        disabled={loading}
                        placeholder="https://example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Domain Group" />
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

              {/* Submit Button */}
              <Button disabled={loading} type="submit" className="w-full">
                {loading ? "Submitting" : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddDomain;
