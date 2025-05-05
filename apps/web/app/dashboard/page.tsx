"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Dashboard</h1>
      <p className="text-lg text-center mb-8">
        Welcome to your OpenScoreboard dashboard. More features are coming soon!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Create a New Scoreboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Start a new scoreboard to track scores for your games or events.
            </p>
            <Link href="/dashboard/new">
              <Button className="w-full cursor-pointer">Create Scoreboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
        <p className="text-lg mb-6">
          Check out our documentation or contact support for assistance.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/docs">
            <Button variant="outline" className="cursor-pointer">View Documentation</Button>
          </Link>
          <Link href="mailto:support@koyu.space">
            <Button className="cursor-pointer">Contact Support</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}