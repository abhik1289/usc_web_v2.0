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

export type Roles = "ADMIN" | "SUPERADMIN" | "MODERATOR";
interface ChangeRoleDialogInterface {
  open: boolean;
  setOpen: (value: boolean) => void;
  editId: string;
  defaultValues: {
    role: Roles;
  }
}

export function ChangeRoleDialog({
  open,
  setOpen,
  editId,
  defaultValues
}: ChangeRoleDialogInterface) {
  const userInfo = useGetUserById(editId);
  console.log("Here", defaultValues)
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof changeRole>>({
    resolver: zodResolver(changeRole),
    defaultValues: {
      role: defaultValues.role,
      isBan: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof changeRole>) => {
    setLoading(true);
    try {
      // Simulate API call or logic to change the role
      console.log(data);
      // On success, reset the form and close the dialog
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Error occurred:", error);
      // Handle the error appropriately (toast, alert, etc.)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Role</DialogTitle>
          <DialogDescription>Select a new role for the user.</DialogDescription>
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
                      disabled={loading}
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
              control={form.control}
              title="Ban User"
              description="Toggle to ban this user. If banned, he/she will not have access to the admin panel."
              name="isBan"
            />
            {/* Footer with Submit Button */}
            <DialogFooter>
              <Button disabled={loading} className="w-full" type="submit">
                {loading ? "Changing..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
