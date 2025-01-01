import React from 'react'
import { Button } from "@/components/ui/button";
import {
    Form
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


    console.log("first")

    const form = useForm<z.infer<typeof LeadsSchema>>({
        resolver: zodResolver(LeadsSchema),
        defaultValues
    });


    const insertMutation = useAddLead();

    function onSubmit(values: z.infer<typeof LeadsSchema>) {
        insertMutation.mutate(values);
        form.reset();
    }
    const roles = useGetRoles();
    const domainGropus = useGetDomainGroup();
    const domainDetails = useGetDomainDetails();

    const filteredDomainDetails = domainDetails.data?.filter((item: any) => item.domainGroupId === form.watch("domainGroupId"));
// console.log(form.watch("domainGroupId"))
    return (
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex flex-wrap gap-4 w-full">
                        
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
