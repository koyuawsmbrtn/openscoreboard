"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null;
    website?: string | null;
  }
  
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await authClient.getSession();
        if (session.error) {
          throw new Error(session.error.message);
        }
        setUser(session.data?.user);
      } catch (error) {
        console.error(error);
        toast.error(
          error instanceof Error ? error.message : "Failed to fetch user data."
        );
        router.push("/login");
      }
    };
    fetchUser();
  }, [router]);

  const handleProfileUpdate = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const website = formData.get("website") as string;
    const profilePicture = formData.get("profilePicture") as string;

    authClient
      .updateUser({
        name,
        image: profilePicture ? profilePicture : user?.image,
        website,
      })
      .then((data) => {
        if (data.error) {
          toast.error(data.error.message);
        } else {
          toast.success("Profile updated successfully.");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(
          error instanceof Error ? error.message : "Failed to update profile."
        );
      });
  };

  const handlePasswordUpdate = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    authClient
      .changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      })
      .then((data) => {
        if (data.error) {
          toast.error(data.error.message);
        } else {
          toast.success("Password updated successfully.");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(
          error instanceof Error ? error.message : "Failed to update password."
        );
      });
  };

  const handleAccountDeletion = async () => {
    toast.custom(
      (t) => (
        <div className="p-4 bg-popover rounded-md shadow-md border">
          <p>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => toast.dismiss(t)} className="cursor-pointer">
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                toast.dismiss(t);
                setLoading(true);
                authClient.deleteUser()
                  .then((data) => {
                    if (data.error) {
                      toast.error(data.error.message);
                    } else {
                      toast.success("Account deleted successfully.");
                      router.push("/login");
                    }
                  })
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      ),
      {
        duration: Infinity, // Keep the toast open until the user interacts
      }
    );
  };

  return (
    <div className="container mx-auto max-w-2xl py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {/* Profile Update Form */}
      <form onSubmit={handleProfileUpdate} className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold">Edit Profile</h2>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Your name" value={user?.name || ""} onChange={(e) => {
            setUser((prev) => (prev ? { ...prev, name: e.target.value } : prev));
          }} required />
        </div>
        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            name="website"
            value={user?.website || ""}
            onChange={(e) => {
              setUser((prev) => (prev ? { ...prev, website: e.target.value } : prev));
            }}
            placeholder="https://example.com"
          />
        </div>
        <div>
          <Label htmlFor="profilePicture">Profile Picture</Label>
          <Input
            id="profilePicture"
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              const base64String = reader.result as string;
              const inputElement = document.querySelector<HTMLInputElement>("#profilePictureBase64");
              if (inputElement) {
                inputElement.value = base64String;
              }
            };
            reader.readAsDataURL(file);
              }
            }}
          />
          <input
            type="hidden"
            id="profilePictureBase64"
            name="profilePicture"
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </Button>
      </form>

      {/* Password Update Form */}
      <form onSubmit={handlePasswordUpdate} className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold">Update Password</h2>
        <div>
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input
            id="currentPassword"
            name="currentPassword"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>
        <div>
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            name="newPassword"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </Button>
      </form>

      {/* Account Deletion */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Delete Account</h2>
        <p className="text-sm text-muted-foreground">
          Deleting your account is permanent and cannot be undone.
        </p>
        <Button
          variant="destructive"
          onClick={handleAccountDeletion}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete Account"}
        </Button>
      </div>
    </div>
  );
}
