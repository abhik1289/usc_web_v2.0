import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { changeRole, ROLES } from "@/schemas/auth/user.schema";
import { useState } from "react";
import useGetUserById from "@/hooks/api/user/useGetUserById";
import SwitchFiled from "../InputFields/SwitchFiled";
import { useUpdateUser } from "@/hooks/api/user/useUpdateUser";

export type Roles = "ADMIN" | "SUPERADMIN" | "MODERATOR";
interface ChangeRoleDialogInterface {
  open: boolean;
  setOpen: (value: boolean) => void;
  editId: string;
  defaultValues: {
    role: Roles;
    isBan: boolean;
  }
}

export function ChangeRoleDialog({
  open,
  setOpen,
  editId,
  defaultValues
}: ChangeRoleDialogInterface) {
  const [loading, setLoading] = useState(false);
  const updateUser = useUpdateUser();




  const form = useForm<z.infer<typeof changeRole>>({
    resolver: zodResolver(changeRole),
    defaultValues: {
      role: defaultValues.role,
      isBan: defaultValues.isBan,
    },
  });

  const onSubmit = async (data: z.infer<typeof changeRole>) => {
    updateUser.mutate({ id: editId, isBan: data.isBan, role: data.role }, {
      onSuccess: () => {
        setOpen(false);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modify User Permissions</DialogTitle>
          <DialogDescription>
            Update the user's role and toggle their access to the admin panel.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Role Selection Field */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={defaultValues.role}
                      onValueChange={field.onChange}
                      disabled={updateUser.isLoading}
                      {...field}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLES.map((item, i) => (
                          <SelectItem key={i} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SwitchFiled
              disabled={updateUser.isLoading}
              control={form.control}
              title="Ban User"
              description="Toggle to ban this user. If banned, he/she will not have access to the admin panel."
              name="isBan"
            />
            {/* Footer with Submit Button */}
            <DialogFooter>
              <Button disabled={updateUser.isLoading} className="w-full" type="submit">
                {updateUser.isLoading ? "Changing..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
