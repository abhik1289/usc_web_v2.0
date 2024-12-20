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
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetRoles } from "@/hooks/api/roles/useGetRoles";
import { useGetDomainGroup } from "@/hooks/api/domain/useGetDomainGroup";
import { useGetDomainDetails } from "@/hooks/api/domain/useGetDomainDetails";
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address." }),
});

function AddLead() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  const roles = useGetRoles();
  const domainGroups = useGetDomainGroup();
  const domainDetails = useGetDomainDetails();
  console.log(domainDetails.data)
  return (
    <div className="p-2">
      <Card>
        <CardHeader>
          <CardTitle>Create New Lead</CardTitle>
          <CardDescription>
            Enter the details to add a new lead to the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-wrap gap-4 w-full">
                <div className="flex w-full gap-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="example@domain.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex w-full gap-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Github</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Instagram</FormLabel>
                        <FormControl>
                          <Input placeholder="example@domain.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex w-full gap-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Portfolio</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Linkedin</FormLabel>
                        <FormControl>
                          <Input placeholder="example@domain.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex w-full gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex flex-1 flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Marketing emails</FormLabel>
                          <FormDescription>
                            Receive emails about new products, features, and
                            more.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={true}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex w-full gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex flex-1 flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Marketing emails</FormLabel>
                          <FormDescription>
                            Receive emails about new products, features, and
                            more.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={true}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex w-full gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            disabled={roles.isLoading}
                            {...field}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                              {roles.data && roles.data.length === 0 ? (
                                <p>No role found</p>
                              ) : (
                                <SelectGroup>
                                  <SelectLabel> Role</SelectLabel>
                                  {roles.data &&
                                    roles.data.map((item: any, i: number) => (
                                      <SelectItem key={i} value={item.id}>
                                        {item.title}
                                      </SelectItem>
                                    ))}
                                </SelectGroup>
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex w-full gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Domain Group</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            disabled={roles.isLoading}
                            {...field}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                              {domainGroups.data &&
                              domainGroups.data.length === 0 ? (
                                <p>No role found</p>
                              ) : (
                                <SelectGroup>
                                  <SelectLabel> Role</SelectLabel>
                                  {domainGroups.data &&
                                    domainGroups.data.map(
                                      (item: any, i: number) => (
                                        <SelectItem key={i} value={item.id}>
                                          {item.title}
                                        </SelectItem>
                                      )
                                    )}
                                </SelectGroup>
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex w-full gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Domain Group</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            disabled={roles.isLoading}
                            {...field}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                              {domainDetails.data &&
                              domainDetails.data.length === 0 ? (
                                <p>No role found</p>
                              ) : (
                                <SelectGroup>
                                  <SelectLabel> Role</SelectLabel>
                                  {domainDetails.data &&
                                    domainDetails.data.map(
                                      (item: any, i: number) => (
                                        <SelectItem key={i} value={item.id}>
                                          {item.title}
                                        </SelectItem>
                                      )
                                    )}
                                </SelectGroup>
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AddLead;
