import React, { useRef, useState } from 'react'
import { Button } from "@/components/ui/button";
import {
    Form,
    FormField
} from "@/components/ui/form";
import {
    CardContent,
} from "@/components/ui/card";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetRoles } from '@/hooks/api/roles/useGetRoles';
import { z } from 'zod';
import { LeadsSchema } from '@/schemas/leads/leads.schema';
import InputFiled from '../InputFields/InputFiled';
import SelectionFiled from '../InputFields/SelectionFiled';
import { useGetDomainGroup } from '@/hooks/api/domainDetails/useGetDomainGroup';
import { useGetDomainDetails } from '@/hooks/api/domainDetails/useGetDomainDetails';
import SwitchFiled from '../InputFields/SwitchFiled';
import { useAddLead } from '@/hooks/api/leads/useAddLead';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Image as ImageIcon } from 'lucide-react';
// import ImageUpload from '../ImageUpload/ImageUpload';
export interface AddLeadFormProps {
    defaultValues: {
        fullName: string,
        isCoreMember: boolean,
        isCurrent: boolean,
        profilePhoto: string,
        domainGroupId: string,
        domainNameId: string,
        Social: {
            email: string,
            linkedinUrl: string,
            githubUrl: string,
            instagramUrl: string,
            portfolioUrl: string,
        },
    };
}


export default function AddLeadForm({ defaultValues }: AddLeadFormProps) {

    //ALL STATES
    const [image, setImage] = useState<string | null>(null);
    const [file, setFile] = useState<string | null>(null);
    const uploadImgRef = useRef<HTMLInputElement>(null);


    //ALL HOOKS
    const { toast } = useToast();
    const roles = useGetRoles();
    const domainGropus = useGetDomainGroup();
    const domainDetails = useGetDomainDetails();
    const insertMutation = useAddLead();

    //ALL FUNCTIONS
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

    const form = useForm<z.infer<typeof LeadsSchema>>({
        resolver: zodResolver(LeadsSchema),
        defaultValues
    });




    function onSubmit(values: z.infer<typeof LeadsSchema>) {
        if (!file) {
            toast({
                description: "Please upload an image",
                variant: "destructive",
            });
            return;
        } else {
            if (values.isCoreMember && !values.coreMemberPositionId) {
                toast({
                    description: "Please select a role",
                    variant: "destructive",
                });
                return;
            }
            const formData = new FormData();
            formData.append('fullName', values.fullName);
            formData.append('email', values.Social.email);
            values.Social.githubUrl && formData.append('githubUrl', values.Social.githubUrl);
            values.Social.instagramUrl && formData.append('instagramUrl', values.Social.instagramUrl);
            values.Social.linkedinUrl && formData.append('linkedinUrl', values.Social.linkedinUrl);
            values.Social.portfolioUrl && formData.append('portfolioUrl', values.Social.portfolioUrl);
            values.isCoreMember && formData.append('isCoreMember', values.isCoreMember.toString());
            formData.append('isCurrent', values.isCurrent.toString());
            formData.append('domainGroupId', values.domainGroupId);
            formData.append('domainNameId', values.domainNameId);
            values.coreMemberPositionId && formData.append('coreMemberPositionId', values.coreMemberPositionId);
            formData.append('profilePhoto', file);
            insertMutation.mutate(formData);
        }

        // insertMutation.mutate(values);
        // form.reset();
    }


    const filteredDomainDetails = domainDetails.data?.filter((item: any) => item.domainGroupId === form.watch("domainGroupId"));
    // console.log(form.watch("domainGroupId"))
    return (
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex flex-wrap gap-4 w-full">
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
                                name="profilePhoto"
                                render={({ field }) => (

                                    <input
                                        accept="image/*"
                                        name={'profilePhoto'}
                                        onChange={handleFileChange}
                                        ref={uploadImgRef}
                                        hidden
                                        type="file"
                                    />

                                )}
                            />
                        </div>
                        <div className="flex w-full gap-4">
                            <InputFiled
                                disabled={insertMutation.isLoading}
                                name="fullName"
                                control={form.control}
                                placeholder="John Doe"
                                label="Full Name"
                            />
                            <InputFiled
                                disabled={insertMutation.isLoading}

                                control={form.control}
                                name="Social.email"
                                placeholder="example@domain.com"
                                label="Email Address"
                            />
                        </div>

                        <div className="flex w-full gap-4">
                            <InputFiled
                                disabled={insertMutation.isLoading}

                                name="Social.githubUrl"
                                control={form.control}
                                placeholder="https://github.com/username"
                                label="GitHub Profile"
                            />
                            <InputFiled
                                disabled={insertMutation.isLoading}

                                name="Social.instagramUrl"
                                control={form.control}
                                placeholder="https://instagram.com/username"
                                label="Instagram Profile"
                            />
                        </div>

                        <div className="flex w-full gap-4">
                            <InputFiled
                                disabled={insertMutation.isLoading}

                                name="Social.linkedinUrl"
                                control={form.control}
                                placeholder="https://linkedin.com/in/username"
                                label="LinkedIn Profile"
                            />
                            <InputFiled
                                disabled={insertMutation.isLoading}

                                name="Social.portfolioUrl"
                                control={form.control}
                                placeholder="https://yourportfolio.com"
                                label="Portfolio URL"
                            />
                        </div>

                        <div className="flex w-full gap-4">
                            <SwitchFiled
                                disabled={insertMutation.isLoading}

                                title="Core Memeber "
                                description=""
                                name="isCoreMember"
                                control={form.control}
                            />
                        </div>
                        <div className="flex w-full gap-4">
                            <SwitchFiled
                                disabled={insertMutation.isLoading}

                                title="Current Memeber: "
                                description=""
                                name="isCurrent"
                                control={form.control}
                            />
                        </div>
                        {form.getValues("isCoreMember") && <div className="flex w-full gap-4">
                            <SelectionFiled
                                disabled={insertMutation.isLoading}

                                control={form.control}
                                name="coreMemberPositionId"
                                defaultText=''
                                // placeholder='Select a role'
                                infos={roles}
                                notFound='No role found'
                                placeholder='Select a Role'
                                label='Role'
                            />
                        </div>}
                        <div className="flex w-full gap-4">
                            <SelectionFiled
                                disabled={insertMutation.isLoading}

                                control={form.control}
                                name="domainGroupId"
                                defaultText=''
                                infos={domainGropus}
                                notFound='No domain group found'
                                placeholder='Select a domain group'
                                label='Domain Group'
                            />
                        </div>
                        {filteredDomainDetails && filteredDomainDetails.length > 0 && <div className="flex w-full gap-4">
                            <SelectionFiled
                                disabled={insertMutation.isLoading}

                                control={form.control}
                                name="domainNameId"
                                defaultText=''
                                infos={domainDetails}
                                notFound='No domain found'
                                placeholder='Select a domain'
                                filterdata={filteredDomainDetails}
                                label='Domain'
                            />
                        </div>}
                    </div>

                    <Button type="submit">{
                        insertMutation.isLoading ? "Loading..." : "Submit"
                    }</Button>
                </form>
            </Form>
        </CardContent>
    )
}
