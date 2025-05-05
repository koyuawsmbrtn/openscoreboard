"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function OverviewPage() {
  const session = authClient.useSession();
  const isLoggedIn = !!session.data?.user;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Welcome to OpenScoreboard</h1>
      <p className="text-lg text-center mb-8">
        OpenScoreboard is your ultimate platform for managing and showcasing your game scoreboards.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Manage Scoreboards</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {isLoggedIn
                ? "Create, edit, and delete your scoreboards with ease."
                : "Sign up or log in to start managing your scoreboards."}
            </p>
            <Link href={isLoggedIn ? "/dashboard" : "/login"}>
              <Button className="w-full cursor-pointer">
                {isLoggedIn ? "Go to Dashboard" : "Log In to Get Started"}
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Learn how to integrate OpenScoreboard into your applications.
            </p>
            <Link href="/docs">
              <Button className="w-full cursor-pointer">View Docs</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Understand how we handle your data and protect your privacy.
            </p>
            <Link href="/privacy">
              <Button className="w-full cursor-pointer">Read Privacy Policy</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Get Started Today</h2>
        <p className="text-lg mb-6">
          {isLoggedIn
            ? "Access your dashboard and start managing your scoreboards."
            : "Sign up or log in to join OpenScoreboard and take your gaming experience to the next level."}
        </p>
        <Link href={isLoggedIn ? "/dashboard" : "/login"}>
          <Button size="lg" className="rounded-full cursor-pointer">
            {isLoggedIn ? "Go to Dashboard" : "Log In to Get Started"}
          </Button>
        </Link>
      </div>
    </div>
  );
}