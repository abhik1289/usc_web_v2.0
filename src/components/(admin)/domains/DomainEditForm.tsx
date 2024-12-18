import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetDomainGroup } from "@/hooks/api/domain/useGetDomainGroup";
import { useEditDomainDetails } from "@/hooks/api/domain/useEditDomainDetails";

const formSchema = z.object({
  title: z
    .string()
    .min(4, { message: "Title must be at least 4 characters long." })
    .max(20, { message: "Title must not exceed 20 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long." })
    .max(100, { message: "Description must not exceed 100 characters." }),
  resourcesUrl: z.string().optional(),
  domainGroupId: z
    .string({ required_error: "Please select a domain group." })
    .min(1),
  bannerUrl: z.string().url("Banner URL must be a valid URL."),
});

interface DomainAccountFormInterface {
  defaultValues: {
    title: string;
    description: string;
    resourcesUrl: string;
    domainGroupId: string;
    bannerUrl: string;
  };
  id: string;
}

export const DomainEditForm = ({
  defaultValues,
  id,
}: DomainAccountFormInterface) => {
  const {
    data: domainGroups,
    isLoading: groupsLoading,
    error: groupsError,
  } = useGetDomainGroup();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const modifyMutation = useEditDomainDetails(id);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    modifyMutation.mutate(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  disabled={modifyMutation.isLoading}
                
                placeholder="Enter domain title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  disabled={modifyMutation.isLoading}
                  placeholder="Enter description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Resources URL */}
        <FormField
          control={form.control}
          name="resourcesUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resources URL</FormLabel>
              <FormControl>
                <Input
                  disabled={modifyMutation.isLoading}
                  placeholder="https://example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Domain Group Selector */}
        <FormField
          control={form.control}
          name="domainGroupId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Domain Group</FormLabel>
              <FormControl>
                <Select
                  disabled={modifyMutation.isLoading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Domain Group" />
                  </SelectTrigger>{" "}
                  <SelectContent>
                    {groupsLoading ? (
                      <SelectItem value="loading" disabled>
                        Loading...
                      </SelectItem>
                    ) : groupsError ? (
                      <SelectItem value="error" disabled>
                        Error loading domain groups
                      </SelectItem>
                    ) : (
                      domainGroups &&
                      domainGroups.map(
                        (group: { id: string; title: string }) => (
                          <SelectItem key={group.id} value={group.id}>
                            {group.title}
                          </SelectItem>
                        )
                      )
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Banner URL */}
        <FormField
          control={form.control}
          name="bannerUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Banner URL</FormLabel>
              <FormControl>
                <Input
                  disabled={modifyMutation.isLoading}

                  placeholder="https://example.com/banner.jpg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={modifyMutation.isLoading}
          className="w-full"
        >
          {modifyMutation.isLoading ? "Submitting..." : "Modify"}
        </Button>
      </form>
    </Form>
  );
};
