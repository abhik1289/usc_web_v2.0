"use client";

import React, { useState, useEffect } from "react";
import { Champion, ChampionDialogProps } from "./type";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

// Champion validation schema
const championSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.instanceof(File).nullable(),
});

type ChampionFormData = z.infer<typeof championSchema>;

export default function ChampionDialog({
  onClose,
  onAddChampion,
  onEditChampion,
  editingChampion,
}: ChampionDialogProps) {
  const form = useForm<ChampionFormData>({
    resolver: zodResolver(championSchema),
    defaultValues: {
      title: "",
      description: "",
      image: null,
    },
  });

  useEffect(() => {
    if (editingChampion) {
      form.reset({
        title: editingChampion.title,
        description: editingChampion.description,
        image: editingChampion.image,
      });
    }
  }, [editingChampion, form]);

  const onSubmit = (data: ChampionFormData) => {
    const championData: Champion = {
      id: editingChampion?.id || Date.now(),
      ...data,
    };

    if (editingChampion && onEditChampion) {
      onEditChampion(championData);
    } else {
      onAddChampion(championData);
    }
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {editingChampion ? "Edit Champion" : "Add Champion"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>Upload Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter description"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2">
              <Button type="submit">
                {editingChampion ? "Update" : "Add"}
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
