"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CardContent } from "@/components/ui/card";
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
import useEditLead from '@/hooks/api/leads/useEditLead';
import { useRouter } from 'next/navigation';
export interface EditLeadFormProps {
    id: string;
    disabled: boolean;
    defaultValues: {
        fullName: string;
        isCoreMember?: boolean;
        isCurrent: boolean;
        profilePhoto: string;
        domainGroupId: string;
        domainNameId: string;
        index: string;
        coreMemberPositionId?: string;
        Social: {
            email: string;
            linkedinUrl: string;
            githubUrl: string;
            instagramUrl: string;
            portfolioUrl: string;
        };
    };
}

export default function EditLeadForm({ defaultValues, id, disabled }: EditLeadFormProps) {


    const router = useRouter();

    const form = useForm<z.infer<typeof LeadsSchema>>({
        resolver: zodResolver(LeadsSchema),
        defaultValues,
    });

    const editMutation = useEditLead(id);
    const roles = useGetRoles();
    const domainGroups = useGetDomainGroup();
    const domainDetails = useGetDomainDetails();

    const filteredDomainDetails = domainDetails.data?.filter(
        (item: any) => item.domainGroupId === form.getValues("domainGroupId")
    );
    console.log(filteredDomainDetails)
    const onSubmit = (values: z.infer<typeof LeadsSchema>) => {
        // console.log("this is calling", values);
        editMutation.mutate(values);
        router.push("/leads");
        // console.log("first")
    };
    console.log(form.formState.errors);
    return (
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex flex-wrap gap-4 w-full">
                        <div className="flex w-full gap-4">
                            <InputFiled
                                name="fullName"
                                control={form.control}
                                placeholder="John Doe"
                                label="Full Name"
                                disabled={disabled || editMutation.isLoading}
                            />
                            <InputFiled
                                name="Social.email"
                                control={form.control}
                                placeholder="example@domain.com"
                                label="Email Address"
                                disabled={disabled || editMutation.isLoading}
                            />
                        </div>

                        <div className="flex w-full gap-4">
                            <InputFiled
                                name="Social.githubUrl"
                                control={form.control}
                                placeholder="https://github.com/username"
                                label="GitHub Profile"
                                disabled={disabled || editMutation.isLoading}
                            />
                            <InputFiled
                                name="Social.instagramUrl"
                                control={form.control}
                                placeholder="https://instagram.com/username"
                                label="Instagram Profile"
                                disabled={disabled || editMutation.isLoading}
                            />
                        </div>

                        <div className="flex w-full gap-4">
                            <InputFiled
                                name="Social.linkedinUrl"
                                control={form.control}
                                placeholder="https://linkedin.com/in/username"
                                label="LinkedIn Profile"
                                disabled={disabled || editMutation.isLoading}
                            />
                            <InputFiled
                                name="Social.portfolioUrl"
                                control={form.control}
                                placeholder="https://yourportfolio.com"
                                label="Portfolio URL"
                                disabled={disabled || editMutation.isLoading}
                            />
                        </div>

                        <div className="flex w-full gap-4">
                            <SwitchFiled
                                description=''
                                title="Core Member"
                                name="isCoreMember"
                                control={form.control}
                                disabled={disabled || editMutation.isLoading}
                            />
                        </div>

                        <div className="flex w-full gap-4">
                            <SwitchFiled
                                description=''
                                title="Current Member"
                                name="isCurrent"
                                control={form.control}
                                disabled={disabled || editMutation.isLoading}
                            />
                        </div>

                        {form.getValues("isCoreMember") && (
                            <div className="flex w-full gap-4">
                                <SelectionFiled
                                    name="coreMemberPositionId"
                                    control={form.control}
                                    infos={roles}
                                    placeholder="Select a role"
                                    label="Role"
                                    defualtValue={defaultValues.coreMemberPositionId ? defaultValues.coreMemberPositionId : ""}
                                    disabled={disabled || editMutation.isLoading}
                                    notFound="No role found"
                                    defaultText=""
                                />
                            </div>
                        )}

                        <div className="flex w-full gap-4">
                            <SelectionFiled
                                name="domainGroupId"
                                control={form.control}
                                infos={domainGroups}
                                placeholder="Select a domain group"
                                label="Domain Group"
                                defualtValue={defaultValues.domainGroupId}
                                disabled={disabled || editMutation.isLoading}
                                notFound="No domain group found"
                                defaultText=""
                            />
                        </div>

                        {filteredDomainDetails && filteredDomainDetails.length > 0 && (
                            <div className="flex w-full gap-4">
                                <SelectionFiled
                                    name="domainNameId"
                                    control={form.control}
                                    infos={domainDetails}
                                    placeholder="Select a domain"
                                    label="Domain"
                                    filterdata={filteredDomainDetails}
                                    defualtValue={defaultValues.domainNameId}
                                    disabled={disabled || editMutation.isLoading}
                                    notFound="No domain found"
                                    defaultText=""
                                />
                                <InputFiled
                                    name="index"
                                    control={form.control}
                                    placeholder="0"
                                    label="Index"
                                    disabled={disabled || editMutation.isLoading}
                                />
                            </div>
                        )}
                    </div>

                    <Button disabled={editMutation.isLoading} type="submit">

                        {
                            editMutation.isLoading ? "Editing..." : "Edit"
                        }

                    </Button>
                </form>
            </Form>
        </CardContent>
    );
}
