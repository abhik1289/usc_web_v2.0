"use client";

import React, { useEffect } from "react";
import { AdvisorMember, AdvisorDialogProps } from "./type";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Advisor validation schema
const advisorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  title: z.string().min(2, "Title must be at least 2 characters"),
  type: z.enum(["advisor", "mentor"], {
    required_error: "Please select a member type",
  }),
  additionalInfo: z.string().optional(),
  photo: z.instanceof(File).nullable(),
});

type AdvisorFormData = z.infer<typeof advisorSchema>;

export default function AdvisorDialog({
  onClose,
  onSubmit,
  editingMember,
}: AdvisorDialogProps) {
  const form = useForm<AdvisorFormData>({
    resolver: zodResolver(advisorSchema),
    defaultValues: {
      name: "",
      title: "",
      type: "advisor",
      additionalInfo: "",
      photo: null,
    },
  });

  const memberType = form.watch("type");

  useEffect(() => {
    if (editingMember) {
      form.reset({
        name: editingMember.name,
        title: editingMember.title,
        type: editingMember.type,
        additionalInfo: editingMember.additionalInfo,
        photo: editingMember.photo,
      });
    }
  }, [editingMember, form]);

  const handleSubmit = (data: AdvisorFormData) => {
    const memberData: AdvisorMember = {
      id: editingMember?.id || Date.now(),
      ...data,
    };
    onSubmit(memberData);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editingMember ? "Edit Member" : "Add Member"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="photo"
              render={({ field: { onChange, _value, ...field } }) => (
                <FormItem>
                  <FormLabel>Upload Photo</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(_) => {
                        const file = _.target.files?.[0] || null;
                        onChange(file);
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Member Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select member type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="advisor">Advisor</SelectItem>
                      <SelectItem value="mentor">Mentor</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {memberType === "advisor" ? "School" : "Custom Title"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        memberType === "advisor"
                          ? "Enter school"
                          : "Enter custom title"
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {memberType === "mentor" && (
              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter additional information"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <DialogFooter className="gap-2">
              <Button type="submit">
                {editingMember ? "Update" : "Add"}
              </Button>
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
