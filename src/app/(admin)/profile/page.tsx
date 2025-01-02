"use client";

import { useState } from "react";
import PasswordChange from "@/components/(admin)/profile/password-change";
import ProfileHeader from "@/components/(admin)/profile/profile-header";
import { Button } from "@/components/ui/button";
import useSWR from "swr";
import axios from "axios";
import SkeletonLoading from "@/components/(admin)/profile/skeleton-loading";
import AlertDialogBox from "@/components/(admin)/AlertDialog.tsx/AlertDialog";
import useLogout from "@/hooks/api/profile/useLogout";
import { useRouter } from "next/navigation";
// import { LogoutResponse, logOutUser } from "@/actions/user/logoutUser";
// import { useRouter } from "next/navigation";
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function ProfilePage() {

  const router = useRouter();

  const [showDialog, setShowDialog] = useState(false);
  const { data, error, isLoading } = useSWR("/api/user/get-user", fetcher);


  const logout = useLogout();

  const handleConfirmLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        // Redirect to the sign-in page after successful logout
        router.push("/sign-in");
        setShowDialog(false);
      },
      onError: (error) => {
        // Handle any errors that occur during logout
        console.error("Logout failed:", error);
      }
    });
  };

  // const router = useRouter();
  const handleLogout = async () => {
    setShowDialog(true);
  };

  const user = data?.infos || {
    first_name: "",
    last_name: "",
    email: "",
    profile_photo: "",
    createdAt: "",
    role: "",
  };
  console.log(data);
  if (error) {
    console.error("Failed to fetch user data:", error);
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {isLoading ? (
        <SkeletonLoading />
      ) : (
        <ProfileHeader
          first_name={user.firstName}
          last_name={user.lastName}
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
         
        </div>
      </div>
      
    </div>
  );
}

export default ProfilePage;
