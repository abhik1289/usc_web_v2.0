"use client";

import { useState } from "react";
import PasswordChange from "@/components/(admin)/profile/password-change";
import ProfileHeader from "@/components/(admin)/profile/profile-header";
import { Button } from "@/components/ui/button";
import useSWR from "swr";
import axios from "axios";
import SkeletonLoading from "@/components/(admin)/profile/skeleton-loading";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function ProfilePage() {
  const { data, error, isLoading } = useSWR("/api/auth/get-user", fetcher);

  const user = data?.infos || {
    first_name: "",
    last_name: "",
    email: "",
    profile_photo: "",
    createdAt: "",
    role: "",
  };

  if (error) {
    console.error("Failed to fetch user data:", error);
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {isLoading ? (
        <SkeletonLoading />
      ) : (
        <ProfileHeader
          first_name={user.first_name}
          last_name={user.last_name}
          email={user.email}
          profile_photo={user.profile_photo}
          createdAt={user.createdAt}
          role={user.role}
        />
      )}
      <div className="bg-muted/50 text-card-foreground rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
        <PasswordChange />
        <div className="mt-6">
          <Button variant="destructive">Logout</Button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
