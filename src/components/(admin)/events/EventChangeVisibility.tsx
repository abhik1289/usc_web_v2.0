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
              ? "Your event is currently private. Click save to make it public."
              : "Your event is currently public. Click save to make it private."}
          </DialogDescription>
        </DialogHeader>
      
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EventChangeVisibility