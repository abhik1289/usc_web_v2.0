import React from 'react'
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
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
const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({ message: "Invalid email address." }),
});
export default function AddLeadForm() {
    const form = useForm<z.infer<typeof LeadsSchema>>({
        resolver: zodResolver(LeadsSchema),
        defaultValues: {
            fullName: "",
            isCoreMember: false,
            isCurrent: true,
            profilePhoto: "",
            domainGroupId: "",
            domainNameId: "",
            index: 0,
            Social: {
                email: "",
                linkedinUrl: "",
                githubUrl: "",
                instagramUrl: "",
                portfolioUrl: "",
            },
        },
    });

    function onSubmit(values: z.infer<typeof LeadsSchema>) {
        console.log(values);
    }
    const roles = useGetRoles();
    const domainGropus = useGetDomainGroup();
    const domainDetails = useGetDomainDetails();
    console.log(domainGropus)
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
                            />
                            <InputFiled
                                control={form.control}
                                name="Social.email"
                                placeholder="example@domain.com"
                                label="Email Address"
                            />
                        </div>

                        <div className="flex w-full gap-4">
                            <InputFiled
                                name="Social.githubUrl"
                                control={form.control}
                                placeholder="https://github.com/username"
                                label="GitHub Profile"
                            />
                            <InputFiled
                                name="Social.instagramUrl"
                                control={form.control}
                                placeholder="https://instagram.com/username"
                                label="Instagram Profile"
                            />
                        </div>

                        <div className="flex w-full gap-4">
                            <InputFiled
                                name="Social.linkedinUrl"
                                control={form.control}
                                placeholder="https://linkedin.com/in/username"
                                label="LinkedIn Profile"
                            />
                            <InputFiled
                                name="Social.portfolioUrl"
                                control={form.control}
                                placeholder="https://yourportfolio.com"
                                label="Portfolio URL"
                            />
                        </div>

                        <div className="flex w-full gap-4">
                            <SwitchFiled
                                title="Core Memeber "
                                description=""
                                name="isCoreMember"
                                control={form.control}
                            />
                        </div>
                        <div className="flex w-full gap-4">
                            <SwitchFiled
                                title="Current Memeber: "
                                description=""
                                name="isCurrent"
                                control={form.control}
                            />
                        </div>
                        <div className="flex w-full gap-4">
                            <SelectionFiled
                                control={form.control}
                                name="coreMemberPositionId"
                                defaultText=''
                                infos={roles}
                                notFound='No role found'
                                placeholder='Select a role'
                                label='Role'
                            />
                        </div>
                        <div className="flex w-full gap-4">
                            <SelectionFiled
                                control={form.control}
                                name="domainGroupId"
                                defaultText=''
                                infos={domainGropus}
                                notFound='No domain group found'
                                placeholder='Select a domain group'
                                label='Domain Group'
                            />
                        </div>
                        <div className="flex w-full gap-4">
                            <SelectionFiled
                                control={form.control}
                                name="domainNameId"
                                defaultText=''
                                infos={domainDetails}
                                notFound='No domain found'
                                placeholder='Select a domain'
                                label='Domain'
                            />
                        </div>
                    </div>

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </CardContent>
    )
}
