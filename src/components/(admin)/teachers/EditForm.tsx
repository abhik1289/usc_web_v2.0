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
// import useAddmentor from "@/hooks/api/mentor/useAddTeacher";
import useAddTeacher from "@/hooks/api/mentor/useAddTeacher";

interface EditFormProps {
  defaultValues: z.infer<typeof TeachersSchema>,
  imageUrl: string
}

function EditForm({ defaultValues, imageUrl }: EditFormProps) {


  //STATES
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<string | null>(null);
  const uploadImgRef = useRef<HTMLInputElement>(null);

  //FORM && HOOKS
  const roles = useGetRoles();
  const insertMentor = useAddTeacher();
  const form = useForm<z.infer<typeof TeachersSchema>>({
    resolver: zodResolver(TeachersSchema),
    defaultValues,
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

  console.log(form.formState.errors)
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
    if (form.watch("memberType") === "Mentor") {
      formData.append("rolesId", values.rolesId!);
      formData.append("customPosition", values.customPosition!);
    }

    insertMentor.mutate(formData, {
      onSuccess: () => {
        form.reset();
        setImage(null);
        setFile(null);
      }
    })
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
              disabled={insertMentor.isLoading}
            >
              <ImageIcon /> Change Image
            </Button>

          </div> : <Image src={imageUrl} width={100} height={100} alt={defaultValues.fullName} />}
          <div className="img_upload_ip">


            <input
              accept="image/*"
              name={'photoUrl'}
              onChange={handleFileChange}
              ref={uploadImgRef}
              hidden
              type="file"
            />


          </div>
          <InputFiled
            disabled={insertMentor.isLoading}

            control={form.control}
            name="fullName"
            placeholder="Jhon Doe"
            label="Full Name"
          />
          <MentorOrAdvisor
            disabled={insertMentor.isLoading}

            defaultText="Select Member Type"
            control={form.control}
            label="Select Member Type"
            placeholder="Select Member"
            name="memberType"
            infos={[MType[0], MType[1]]}
          />
          {isAdvisor ? <>
            <InputFiled
              disabled={insertMentor.isLoading}

              control={form.control}
              name="school"
              placeholder="School of computer science"
              label="School"
            />
          </> : <><InputFiled
            disabled={insertMentor.isLoading}

            control={form.control}
            name="school"
            placeholder="School of computer science"
            label="School"
          />
            <SelectionFiled
              disabled={insertMentor.isLoading}

              placeholder="Select Role"
              name="rolesId"
              control={form.control}
              label="Select Role"
              infos={roles}
              notFound="No roles found"

            />
            <InputFiled
              disabled={insertMentor.isLoading}

              control={form.control}
              name="customPosition"
              placeholder="Professor & Dean (Industry Engagements)"
              label="Additional Title"
            /></>}
          <Button
            disabled={insertMentor.isLoading}

            type="submit">{
              insertMentor.isLoading ? "Adding..." : "Add"
            }</Button>
        </form>
      </Form>
    </CardContent>
  )
}

export default EditForm