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
import useEditTestimonial from "@/hooks/api/testimonials/useEditTestimonials";
import { useRouter } from "next/navigation";
import Cropper from 'react-easy-crop';
import { useRef, useState } from 'react';
import { Edit2Icon, ImageIcon } from "lucide-react";
import Image from "next/image";
import getCroppedImg from "@/lib/ImageCrop";
import { Role } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
interface AddTestimonialsFormInterface {
  defaultValues: {
    fullName: string;
    text: string;
    rolesId: string;
    index?: string;
    photoUrl: string;
  };
  isEdit: boolean;
  isLoading: boolean;
  editId: string;
}

export const EditTestimonialsForm = ({
  defaultValues,
  isEdit,
  isLoading,
  editId,
}: AddTestimonialsFormInterface) => {



  // State management for image cropping
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [editDialog, setEditDialog] = useState(false);


  const uploadImgRef = useRef<HTMLInputElement>(null);

  const roles = useGetRoles();

  // Form setup using react-hook-form and Zod for validation
  const form = useForm<z.infer<typeof testimonialSchema>>({
    resolver: zodResolver(testimonialSchema),
    defaultValues,
  });

  const editTestimonialMutation = useEditTestimonial(editId);
  const router = useRouter();

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof testimonialSchema>) => {
    console.log(values);
    await editTestimonialMutation.mutateAsync(values);
    router.push("/testimonials");
  };

  // Handle crop completion
  const onCropComplete = (croppedArea: any, croppedAreaPixel: any) => {
    setCroppedAreaPixels(croppedAreaPixel);
  };

  // Show cropped image
  const showCroppedImage = async () => {
    try {
      const croppedImg = await getCroppedImg(
        defaultValues.photoUrl,
        croppedAreaPixels,
        rotation
      );
      setCroppedImage(croppedImg);
      console.log(croppedImg);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <button type="button" onClick={showCroppedImage}>Done</button>

        {/* Image Cropper */}
        {/* <div className="crop_box w-[400px] h-[400px] overflow-hidden bg-red-50 absolute">
          {/* <Cropper
            image={defaultValues.photoUrl}
            crop={crop}
            zoom={zoom}
            cropShape="round"
            aspect={4 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          /> */}
        {/* </div>  */}

        {/* Display Cropped Image or Default Image */}
        {defaultValues.photoUrl && (
          <div className="flex flex-col">
            <div className="image w-[70px] h-[70px] rounded-full relative">
              <Image
                width={100}
                height={100}
                alt={defaultValues.fullName}
                src={croppedImage ? croppedImage : defaultValues.photoUrl}
              />
            </div>
            <div className="edit_btn mt-2">
              <Button onClick={() => setEditDialog(true)} type="button" className="w-[70px]">
                <Edit2Icon size={20} />
                Edit
              </Button>
            </div>
          </div>
        )}
        {editDialog && <Dialog open={editDialog}>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload & Crop Image</DialogTitle>
            </DialogHeader>
            <div className="image_upload_controller h-[300px] flex justify-center items-center">
              <Button onClick={() => uploadImgRef.current?.click()} type="button">
                <ImageIcon size={20} />
                Upload Image
              </Button>
              <div className="img_upload_ip">
                <FormField

                  control={form.control}
                  name="photoUrl"
                  render={({ field }) => (

                    <input name={'photoUrl'} ref={uploadImgRef} hidden type="file" />

                  )}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>}
        {/* Full Name Field */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input disabled={isLoading || editTestimonialMutation.isLoading} placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Role Selection */}
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
                    disabled={roles.isLoading || isLoading || editTestimonialMutation.isLoading}
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
                          <SelectLabel>Role</SelectLabel>
                          {roles.data.map((item: any) => (
                            <SelectItem key={item.id} value={item.id}>
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

          {/* Sequence Field (only for editing) */}
          {isEdit && (
            <FormField
              control={form.control}
              name="index"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Sequence</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading || editTestimonialMutation.isLoading}
                      type="text"
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

        {/* Opinion Text Area */}
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opinion</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isLoading || editTestimonialMutation.isLoading}
                  placeholder="Share your experience..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button disabled={isLoading || editTestimonialMutation.isLoading} type="submit">
          {isLoading || editTestimonialMutation.isLoading ? "Editing..." : "Edit"}
        </Button>
      </form>
    </Form>
  );
};
