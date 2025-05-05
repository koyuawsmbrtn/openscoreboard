"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import md5 from "crypto-js/md5";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [signUpMode, setSignUpMode] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const password2 = formData.get("password2") as string;
    if (forgotPassword) {
      await authClient.forgetPassword({
        email,
        redirectTo: "/reset-password",
      }).then((data) => {
        if (data.error) {
          toast.error(data.error.message);
        }
        if (data.data) {
          toast.success("Check your email to reset your password.");
        }
      }).catch((error) => {
        toast.error(error.message);
      });
    } else if (signUpMode) {
      if (password !== password2) {
        toast.error("Passwords do not match.");
        return;
      }
      await authClient.signUp.email({
        email,
        password,
        name: email,
        image: "https://gravatar.com/avatar/" + md5(email),
      }).then((data) => {
        if (data.error) {
          toast.error(data.error.message);
        } else {
          toast.success("Check your email to verify your account.");
        }
      }).catch((error) => {
        toast.error(error.message);
      });
    } else {
      await authClient.signIn.email({
        email,
        password,
      }).then(() => {
        toast.success("Logged in successfully.");
        router.push("/dashboard");
      }).catch((error) => {
        toast.error(error.message);
      });
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      {forgotPassword && (
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email to receive a password reset link.
          </p>
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              required
            />
            <Button type="submit" className="w-full cursor-pointer mt-3">
              Send Reset Link
            </Button>
          </div>
        </div>
      )}
      {!forgotPassword && (
        <>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">
              {signUpMode ? "Sign Up" : "Login"}
            </h1>
            <p className="text-muted-foreground text-sm text-balance">
              {signUpMode
                ? "Create an account to get started."
                : "Welcome back! Please enter your details."}
            </p>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {!signUpMode && (
                  <p
                    className="ml-auto text-sm underline-offset-4 hover:underline cursor-pointer"
                    onClick={() => {
                      setForgotPassword(true);
                    }}
                  >
                    Forgot your password?
                  </p>
                )}
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                required
                placeholder="••••••••••••"
              />
              {signUpMode && (
                <div className="grid gap-3">
                  <Label htmlFor="password2">Confirm Password</Label>
                  <Input
                    id="password2"
                    type="password"
                    name="password2"
                    required
                    placeholder="••••••••••••"
                  />
                </div>
              )}
            </div>
            <Button type="submit" className="w-full">
              {signUpMode ? "Sign Up" : "Login"}
            </Button>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-background text-muted-foreground relative z-10 px-2">
                Or continue with
              </span>
            </div>
            <Button
              variant="outline"
              className="w-full cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                authClient.signIn.social({
                  provider: "github",
                  callbackURL: `${window.location.origin}/dashboard`,
                });
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  fill="currentColor"
                />
              </svg>
              Login with GitHub
            </Button>
          </div>
          <div className="text-center text-sm">
            {signUpMode ? "Already have an account?" : "Don't have an account?"}
            <p
              className="underline underline-offset-4 mt-3 cursor-pointer"
              onClick={() => setSignUpMode(!signUpMode)}
            >
              {signUpMode ? "Login" : "Sign up"} instead
            </p>
          </div>
        </>
      )}
      {forgotPassword && (
        <div className="text-center text-sm">
          <p
            className="underline underline-offset-4 mt-3 cursor-pointer"
            onClick={() => setForgotPassword(false)}
          >
            Back to login
          </p>
        </div>
      )}
    </form>
  );
}
