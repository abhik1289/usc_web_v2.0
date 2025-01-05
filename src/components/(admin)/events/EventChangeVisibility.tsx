import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"



interface EventChangeVisibilityProps {
  open: boolean;
  setOpen: () => void;
  visibility: "Private" | "Public";
}

function EventChangeVisibility({ open, setOpen, visibility }: EventChangeVisibilityProps) {
  return (

    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {visibility === "Private" ? "Make it Public" : "Make it Private"}
          </DialogTitle>
          <DialogDescription>
            {visibility === "Private"
              ? "Your profile is currently private. Click save to make it public."
              : "Your profile is currently public. Click save to make it private."}
          </DialogDescription>
        </DialogHeader>
        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div> */}
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EventChangeVisibility