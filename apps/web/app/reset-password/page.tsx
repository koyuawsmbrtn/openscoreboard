"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) {
      toast.error("Invalid or missing reset token.");
      setLoading(false);
      return;
    }

    try {
      const response = await authClient.resetPassword({
        token,
        newPassword: password,
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      toast.success("Password reset successfully. You can now log in.");
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-md py-8 px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Reset Password</h1>
      <p className="text-sm text-muted-foreground mb-6 text-center">
        Enter your new password below to reset your account.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="password">New Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••••••"
            required
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••••••"
            required
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Resetting Password..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
}