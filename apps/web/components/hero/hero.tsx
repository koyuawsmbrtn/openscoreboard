"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BackgroundPattern } from "./background-pattern";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const Hero = () => {
  const session = authClient.useSession();
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
      <BackgroundPattern />

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <Badge className="bg-primary text-primary-foreground rounded-full px-3 py-1.5 text-sm font-medium">
          First release 🎉
        </Badge>
        <h1 className="mt-4 sm:mt-6 text-3xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
          Level up your gaming experience with
          <span className="text-primary"> OpenScoreboard</span>
        </h1>
        <p className="mt-4 sm:mt-6 text-base sm:text-[17px] md:text-lg">
          An open platform for game developers to create and manage their own
          scoreboards with ease.
        </p>
        <div className="mt-2 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link href={session.data?.user ? "/dashboard" : "/login"} className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-full text-base cursor-pointer"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
