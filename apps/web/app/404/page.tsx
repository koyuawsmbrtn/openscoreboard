"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800">404</h1>
            <p className="mt-4 text-lg text-gray-600">
                Oops! The page you are looking for does not exist.
            </p>
            <Button
                className="mt-6 cursor-pointer"
                onClick={() => (router.push("/"))}
            >
                <ChevronLeft />
                Go Back Home
            </Button>
        </div>
    );
}