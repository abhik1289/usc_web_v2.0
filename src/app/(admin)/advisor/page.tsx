"use client";

import React, { useState } from "react";
import AdvisorDialog from "@/components/(admin)/advisor/AdvisorDialog";
import { AdvisorMember } from "@/components/(admin)/advisor/type";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AdvisorPage() {
  const [members, setMembers] = useState<AdvisorMember[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<AdvisorMember | null>(null);

  const handleSubmit = (memberData: AdvisorMember) => {
    if (editingMember) {
      setMembers((prevMembers) =>
        prevMembers.map((member) => (member.id === memberData.id ? memberData : member))
      );
    } else {
      setMembers((prevMembers) => [...prevMembers, memberData]);
    }
  };

  const handleDelete = (id: number) => {
    setMembers((prevMembers) => prevMembers.filter((member) => member.id !== id));
  };

  const advisors = members.filter((member) => member.type === "advisor");
  const mentors = members.filter((member) => member.type === "mentor");

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Mentor & Advisor</h1>
        <Button onClick={() => setIsDialogOpen(true)}>Add Member</Button>
      </div>

      <Separator />

      {/* Advisors Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Advisors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advisors.map((advisor) => (
            <Card key={advisor.id} className="relative">
              {advisor.photo && (
                <img
                  src={URL.createObjectURL(advisor.photo)}
                  alt={advisor.name}
                  className="w-24 h-24 rounded-full mx-auto mt-4 object-cover"
                />
              )}
              <CardHeader>
                <CardTitle className="text-center">{advisor.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">{advisor.title}</p>
              </CardContent>
              <CardFooter className="flex justify-center space-x-2">
                <Button
                  variant="link"
                  onClick={() => {
                    setEditingMember(advisor);
                    setIsDialogOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(advisor.id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      {/* Mentors Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Mentors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <Card key={mentor.id} className="relative">
              {mentor.photo && (
                <img
                  src={URL.createObjectURL(mentor.photo)}
                  alt={mentor.name}
                  className="w-24 h-24 rounded-full mx-auto mt-4 object-cover"
                />
              )}
              <CardHeader>
                <CardTitle className="text-center">{mentor.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">{mentor.title}</p>
                {mentor.additionalInfo && (
                  <p className="text-sm text-gray-500 text-center mt-2">
                    {mentor.additionalInfo}
                  </p>
                )}
              </CardContent>
              <CardFooter className="flex justify-center space-x-2">
                <Button
                  variant="link"
                  onClick={() => {
                    setEditingMember(mentor);
                    setIsDialogOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(mentor.id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {isDialogOpen && (
        <AdvisorDialog
          onClose={() => {
            setIsDialogOpen(false);
            setEditingMember(null);
          }}
          onSubmit={handleSubmit}
          editingMember={editingMember}
        />
      )}
    </div>
  );
}
