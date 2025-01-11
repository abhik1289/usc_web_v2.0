"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { testimonialSchema } from "@/schemas/testimonials/testimonials.shema";
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
import useInsertTestimonial from "@/hooks/api/testimonials/useInsertTestimonials";
import { Image as ImageIcon } from "lucide-react";
import { useRef, useState } from "react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
interface AddTestimonialsFormInterface {
  defaultValues: {
    fullName: string;
    text: string;
    rolesId: string;
    index?: string;
    photoUrl: string;
  };
  isEdit: boolean;
}

export const AddTestimonialsForm = ({
  defaultValues,
  isEdit,
}: AddTestimonialsFormInterface) => {


  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<string | null>(null);
  const uploadImgRef = useRef<HTMLInputElement>(null);
  const roles = useGetRoles();
  const { toast } = useToast();
  const handleButtonClick = () => {
    uploadImgRef.current?.click();
  }
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setFile(file);
    if (file) {
      const reader: any = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof testimonialSchema>>({
    resolver: zodResolver(testimonialSchema),
    defaultValues,
  });

  const InsertTestimonial = useInsertTestimonial();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof testimonialSchema>) {
    if (!file) {
      toast({
        description: "Please upload an image",
        variant: "destructive",
      })
    } else {
      const formData = new FormData();
      formData.append('fullName', values.fullName);
      formData.append('text', values.text);
      formData.append('rolesId', values.rolesId);
      // formData.append('index', values.index!);
      formData.append('text', values.text);
      formData.append('file', file);
      InsertTestimonial.mutate(formData, {
        onSuccess: () => {
          form.reset();
          // rset image and file
          setImage("");
          setFile("");
        }
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {image ? <div className="img_preview_container">
          <div className="img_preview  w-[60px] h-[60px] rounded-full overflow-hidden">
            <Image
              alt=""
              width={100}
              height={100}
              src={image}
            />
          </div>


          <Button type="button" className="mt-2" onClick={handleButtonClick}>
            <ImageIcon /> Change Image
          </Button>

        </div> : <Button type="button" onClick={handleButtonClick}>
          <ImageIcon /> Upload Image

        </Button>}
        <div className="img_upload_ip">
          <FormField

            control={form.control}
            name="photoUrl"
            render={({ field }) => (

              <input
                accept="image/*"
                name={'photoUrl'}
                onChange={handleFileChange}
                ref={uploadImgRef}
                hidden
                type="file"
              />

            )}
          />
        </div>
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fullname</FormLabel>
              <FormControl>
                <Input
                  disabled={InsertTestimonial.isLoading}
                  placeholder="John Doe"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="rolesId"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    disabled={roles.isLoading || InsertTestimonial.isLoading}
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

          {isEdit && (
            <FormField
              control={form.control}
              name="index"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Sequence</FormLabel>
                  <FormControl>
                    <Input
                      disabled={InsertTestimonial.isLoading}
                      type="number"
                      placeholder="1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opinion</FormLabel>
              <FormControl>
                <Textarea
                  disabled={InsertTestimonial.isLoading}
                  placeholder="Share your experience..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={InsertTestimonial.isLoading} type="submit">
          {InsertTestimonial.isLoading ? "Adding" : "Add"}
        </Button>
      </form>
    </Form>
  );
};
