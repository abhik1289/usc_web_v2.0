"use client";

import { useState } from "react";
import PasswordChange from "@/components/(admin)/profile/password-change";
import ProfileHeader from "@/components/(admin)/profile/profile-header";
import { Button } from "@/components/ui/button";
import useSWR from "swr";
import axios, { AxiosResponse } from "axios";
import SkeletonLoading from "@/components/(admin)/profile/skeleton-loading";
// import { LogoutResponse, logOutUser } from "@/actions/user/logoutUser";
import { useRouter } from "next/navigation";
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const { data, error, isLoading } = useSWR("/api/user/get-user", fetcher);
  const router = useRouter();
  const handleLogout = async () => {
    try {
      setLoading(true);
      // const res: LogoutResponse = await logOutUser(); // Assuming logOutUser is defined elsewhere

      // if (res.success) {
      //   router.push("/sign-in");
      // } else {
      //   console.error("Logout failed" + res.error);
      // }
      setLoading(false);
    } catch (error) {
      console.error("Error during logout:", error);
      setLoading(false);
    }
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
          <Button
            disabled={loading}
            onClick={handleLogout}
            variant="destructive"
          >
            {loading ? "Logout.." : "Logout"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
