"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePassword } from "./actions";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

export default function PasswordChange() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios({
        url: "/api/user/update-password",
        method: "POST",
        data: {
          oldPassword,
          newPassword,
        },
      });
      if (response.status == 200 && response.data.success == true) {
        setMessage(response.data.message);
      } else {
        setMessage(response.data.error);
      }
      if (response.status == 200) {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field: "old" | "new" | "confirm") => {
    switch (field) {
      case "old":
        setShowOldPassword(!showOldPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmPassword(!showConfirmPassword);
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <Label htmlFor="oldPassword">Old Password</Label>
        <Input
          id="oldPassword"
          type={showOldPassword ? "text" : "password"}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => togglePasswordVisibility("old")}
          className="absolute right-2 top-8 text-gray-500"
          aria-label={
            showOldPassword ? "Hide old password" : "Show old password"
          }
        >
          {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      <div className="relative">
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          id="newPassword"
          type={showNewPassword ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => togglePasswordVisibility("new")}
          className="absolute right-2 top-8 text-gray-500"
          aria-label={
            showNewPassword ? "Hide new password" : "Show new password"
          }
        >
          {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      <div className="relative">
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <Input
          id="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => togglePasswordVisibility("confirm")}
          className="absolute right-2 top-8 text-gray-500"
          aria-label={
            showConfirmPassword
              ? "Hide confirm password"
              : "Show confirm password"
          }
        >
          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Changing Password..." : "Change Password"}
      </Button>
      {message && (
        <p className="text-sm text-muted-foreground mt-2">{message}</p>
      )}
    </form>
  );
}
