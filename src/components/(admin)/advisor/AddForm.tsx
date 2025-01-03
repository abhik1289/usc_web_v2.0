"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CardContent } from '@/components/ui/card'
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import InputFiled from "../InputFields/InputFiled"
import MentorOrAdvisor from "./input/MentorSelction"
import TeachersSchema, { MType } from "@/schemas/mentor/mentor.schema"



function AddForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof TeachersSchema>>({
    resolver: zodResolver(TeachersSchema),
    defaultValues: {
      fullName: "",
      school: "",
      customPosition: "",
      memberType: MType[0],
      rolesId: ""
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof TeachersSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }



  const isAdvisor = form.watch("memberType") === MType[1];

  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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