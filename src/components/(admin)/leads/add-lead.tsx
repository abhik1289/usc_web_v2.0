import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
function AddLead() {
  return (
    <div className="p-2">
      <Card>
        <CardHeader>
          <CardTitle>Create New Lead</CardTitle>
          <CardDescription>
            Enter the details to add a new lead to the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AddLead;
