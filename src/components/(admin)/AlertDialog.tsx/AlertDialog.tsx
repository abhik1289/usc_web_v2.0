import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AlertDialogBoxInterface {
  title: string;
  description: string;
  show: boolean;
  setShow: () => void;
  onConfirm: () => void;
}

export default function AlertDialogBox({
  title,
  description,
  show,
  setShow,
  onConfirm,
}: AlertDialogBoxInterface) {
  return (
    <AlertDialog open={show}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title}
            {/* Are you sure you want to delete this role? */}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description}
            
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setShow()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
