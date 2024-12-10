import { Skeleton } from "@/components/ui/skeleton"; // Or your custom skeleton component
import { Button } from "@/components/ui/button";

export default function LoadingComment() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <Skeleton className="w-32 h-6" />
      <p className="text-sm text-muted-foreground">Loading comment...</p>
      <Skeleton className="w-64 h-4" />
      <Skeleton className="w-48 h-4" />
      <Button disabled className="w-full mt-4">
        Loading...
      </Button>
    </div>
  );
}
