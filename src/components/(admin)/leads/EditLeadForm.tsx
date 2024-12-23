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
import useEditLead from '@/hooks/api/leads/useEditLead';
export interface EditLeadFormProps {
    id: string;
    disabled: boolean;
    defaultValues: {
        fullName: string,
        isCoreMember: boolean,
        isCurrent: boolean,
        profilePhoto: string,
        domainGroupId: string,
        domainNameId: string,
        coreMemberPositionId: string,
        // index: string,
        Social: {
            email: string,
            linkedinUrl: string,
            githubUrl: string,
            instagramUrl: string,
            portfolioUrl: string,
        },
    };
}


export default function EditLeadForm({ defaultValues, id, disabled }: EditLeadFormProps) {
    const form = useForm<z.infer<typeof LeadsSchema>>({
        resolver: zodResolver(LeadsSchema),
        defaultValues
    });


    const editMutation = useEditLead();


    const roles = useGetRoles();
    const domainGropus = useGetDomainGroup();
    const domainDetails = useGetDomainDetails();

    const filteredDomainDetails = domainDetails.data?.filter((item: any) => item.domainGroupId === form.getValues("domainGroupId"));
    function onSubmit(values: z.infer<typeof LeadsSchema>) {
        console.log(values)
        // editMutation.mutate({ ...values, id: id });
    }
    return (
        <CardContent>
            <Form  {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex flex-wrap gap-4 w-full">
                        <div className="flex w-full gap-4">
                            <InputFiled
                                name="fullName"
                                control={form.control}
                                placeholder="John Doe"
                                label="Full Name"
                                disabled={disabled}
                            />
                            <InputFiled
                                control={form.control}
                                name="Social.email"
                                placeholder="example@domain.com"
                                label="Email Address"
                                disabled={disabled}

                            />
                        </div>

                        <div className="flex w-full gap-4">
                            <InputFiled
                                name="Social.githubUrl"
                                control={form.control}
                                placeholder="https://github.com/username"
                                label="GitHub Profile"
                                disabled={disabled}

                            />
                            <InputFiled
                                name="Social.instagramUrl"
                                control={form.control}
                                placeholder="https://instagram.com/username"
                                label="Instagram Profile"
                                disabled={disabled}

                            />
                        </div>

                        <div className="flex w-full gap-4">
                            <InputFiled
                                name="Social.linkedinUrl"
                                control={form.control}
                                placeholder="https://linkedin.com/in/username"
                                label="LinkedIn Profile"
                                disabled={disabled}

                            />
                            <InputFiled
                                name="Social.portfolioUrl"
                                control={form.control}
                                placeholder="https://yourportfolio.com"
                                label="Portfolio URL"
                                disabled={disabled}

                            />
                        </div>

                        <div className="flex w-full gap-4">
                            <SwitchFiled
                                title="Core Memeber "
                                description=""
                                name="isCoreMember"
                                control={form.control}
                                disabled={disabled}

                            />
                        </div>
                        <div className="flex w-full gap-4">
                            <SwitchFiled
                                title="Current Memeber: "
                                description=""
                                name="isCurrent"
                                control={form.control}
                                disabled={disabled}

                            />
                        </div>
                        {form.getValues("isCoreMember") && <div className="flex w-full gap-4">
                            <SelectionFiled
                                disabled={disabled}
                                control={form.control}
                                name="coreMemberPositionId"
                                defaultText=''
                                infos={roles}
                                notFound='No role found'
                                placeholder='Select a role'
                                label='Role'
                                defualtValue={defaultValues.coreMemberPositionId}
                            />
                        </div>}
                        <div className="flex w-full gap-4">
                            <SelectionFiled
                                disabled={disabled}
                                defualtValue={defaultValues.domainGroupId}
                                control={form.control}
                                name="domainGroupId"
                                defaultText=''
                                infos={domainGropus}
                                notFound='No domain group found'
                                placeholder='Select a domain group'
                                label='Domain Group'
                            />
                            {/* <InputFiled
                                name="index"
                                control={form.control}
                                placeholder="0"
                                label="index"
                                disabled={disabled}

                            /> */}
                        </div>
                        {filteredDomainDetails && filteredDomainDetails.length > 0 && <div className="flex w-full gap-4">
                            <SelectionFiled
                                disabled={disabled}
                                defualtValue={defaultValues.domainNameId}
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

                    <Button type="submit">Edit</Button>
                </form>
            </Form>
        </CardContent>
    )
}
