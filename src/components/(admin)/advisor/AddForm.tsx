"use client"
import { Image as ImageIcon } from "lucide-react";
import { useRef, useState } from "react"
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CardContent } from '@/components/ui/card'
import { Form, FormField } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import InputFiled from "../InputFields/InputFiled"
import MentorOrAdvisor from "./input/MentorSelction"
import TeachersSchema, { MType } from "@/schemas/mentor/mentor.schema"
import SelectionFiled from "../InputFields/SelectionFiled"
import useGetRoles from "@/hooks/api/role/useGetRoles"



function AddForm() {


  //STATES
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<string | null>(null);
  const uploadImgRef = useRef<HTMLInputElement>(null);

  //FORM && HOOKS
  const roles = useGetRoles();
  const form = useForm<z.infer<typeof TeachersSchema>>({
    resolver: zodResolver(TeachersSchema),
    defaultValues: {
      fullName: "",
      school: "",
      customPosition: "",
      memberType: MType[0],
      rolesId: ""
    },
  });

  //LOGIC: handle image upload
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


  //foRM SUBMIT
  function onSubmit(values: z.infer<typeof TeachersSchema>) {
    const formData = new FormData();
    if (!file) {
      return;
    }
    formData.append("fullName", values.fullName);
    formData.append("school", values.school);
    formData.append("memberType", values.memberType);
    formData.append('file', file);
    if (form.watch("memberType") === MType[0]) {
      formData.append("rolesId", values.rolesId!);
      formData.append("customPosition", values.customPosition!);
    }
  }

  //LOGIC: if memberType is advisor then show only school field
  const isAdvisor = form.watch("memberType") === MType[1];


  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {image ? <div className="img_preview_container">
            <div className="img_preview  w-[100px] h-[100px]  overflow-hidden">
              <Image
                alt=""
                width={100}
                height={100}
                src={image}
              />
            </div>
            <Button
              type="button"
              className="mt-2"
              onClick={handleButtonClick}
            >
              <ImageIcon /> Change Image
            </Button>

          </div> : <Button type="button" onClick={handleButtonClick}>
            <ImageIcon /> Upload Image

          </Button>}
          <div className="img_upload_ip">
            <FormField

              control={form.control}
              name="profilePhoto"
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
          <InputFiled
            control={form.control}
            name="fullName"
            placeholder="Jhon Doe"
            label="Full Name"
          />
          <MentorOrAdvisor
            defaultText="Select Member Type"
            control={form.control}
            label="Select Member Type"
            placeholder="Select Member"
            name="memberType"
            infos={[MType[0], MType[1]]}
          />
          {isAdvisor ? <>
            <InputFiled
              control={form.control}
              name="school"
              placeholder="School of computer science"
              label="School"
            />
          </> : <><InputFiled
            control={form.control}
            name="school"
            placeholder="School of computer science"
            label="School"
          />
            <SelectionFiled
              placeholder="Select Role"
              name="rolesId"
              control={form.control}
              label="Select Role"
              infos={roles}
              notFound="No roles found"

            />
            <InputFiled
              control={form.control}
              name="additionalTitle"
              placeholder="Professor & Dean (Industry Engagements)"
              label="Additional Title"
            /></>}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </CardContent>
  )
}

export default AddForm