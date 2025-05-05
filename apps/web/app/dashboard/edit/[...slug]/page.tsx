"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { RefreshCcw } from "lucide-react";

export default function EditScoreboardPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug?.[0]; // Extract the slug from the URL

  const [loading, setLoading] = useState(false);
  const [scoreboard, setScoreboard] = useState({
    id: "",
    name: "",
    description: "",
    apiKey: "",
    slug: "",
  });

  useEffect(() => {
    if (!slug) {
      alert("Scoreboard slug is missing.");
      router.push("/dashboard");
      return;
    }

    const fetchScoreboard = async () => {
      try {
        const response = await fetch(`/api/scoreboard/get-private`);
        if (!response.ok) {
          throw new Error("Failed to fetch scoreboards.");
        }
        const data = await response.json();

        // Filter the scoreboards to find the one with the matching slug
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const matchedScoreboard = data.find((board: any) => board.slug === slug);
        if (!matchedScoreboard) {
          throw new Error("Scoreboard not found.");
        }

        setScoreboard({
          id: matchedScoreboard.id || "",
          name: matchedScoreboard.name || "",
          description: matchedScoreboard.description || "", // Include description
          apiKey: matchedScoreboard.apiKey || "", // Set apiKey from matchedScoreboard
          slug: matchedScoreboard.slug || "",
        });
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          alert(error.message || "Failed to load scoreboard.");
        } else {
          alert("Failed to load scoreboard.");
        }
        router.push("/dashboard");
      }
    };

    fetchScoreboard();
  }, [slug, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/scoreboard/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: scoreboard.id,
          name: scoreboard.name,
          description: scoreboard.description,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update scoreboard.");
      }

      alert("Scoreboard updated successfully.");
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        alert(error.message || "Failed to update scoreboard.");
      } else {
        alert("Failed to update scoreboard.");
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteScoreboard = async () => {
    if (confirm("Are you sure you want to delete this scoreboard?")) {
      setLoading(true);
      try {
        const response = await fetch(`/api/scoreboard/delete?slug=${encodeURIComponent(scoreboard.slug)}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to delete scoreboard.");
        }
        alert("Scoreboard deleted successfully.");
        router.push("/dashboard");
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          alert(error.message || "Failed to delete scoreboard.");
        } else {
          alert("Failed to delete scoreboard.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteScoreboard();
  };

  const refreshAPIKey = async () => {
    if (confirm("Are you sure you want to refresh the API key?")) {
      setLoading(true);
      try {
        const response = await fetch(`/api/scoreboard/update`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: scoreboard.id,
            apiKey: crypto.randomUUID(), // Generate a new API key
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to refresh API key.");
        }

        alert("API key refreshed successfully.");
        const data = await response.json();
        setScoreboard((prev) => ({
          ...prev,
          apiKey: data.apiKey, // Update the API key in the state
        }));
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          alert(error.message || "Failed to refresh API key.");
        } else {
          alert("Failed to refresh API key.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRefreshAPIKey = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    refreshAPIKey();
  };

  return (
    <div className="container max-w-2xl py-8 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Scoreboard</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={scoreboard.name}
            onChange={(e) => setScoreboard({ ...scoreboard, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            rows={6}
            value={scoreboard.description}
            onChange={(e) => setScoreboard({ ...scoreboard, description: e.target.value })}
          />
        </div>
        <div>
            <Label htmlFor="apiKey">API Key</Label>
            <div className="relative">
            <Input
                id="apiKey"
                name="apiKey"
                value={scoreboard.apiKey}
                readOnly
                className="pr-12"
            />
            <Button
                type="button"
                onClick={handleRefreshAPIKey}
                disabled={loading}
                className="absolute inset-y-0 right-0 px-3 cursor-pointer"
                variant="outline"
            >
                <RefreshCcw className="h-4 w-4" />
            </Button>
            </div>
        </div>
        <Button type="submit" disabled={loading} className="w-full cursor-pointer">
          {loading ? "Updating..." : "Update Scoreboard"}
        </Button>
        <Button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          variant="destructive"
          className="w-full cursor-pointer"
        >
          {loading ? "Deleting..." : "Delete Scoreboard"}
        </Button>
        <p className="text-sm text-muted-foreground">
          Note: Deleting a scoreboard is permanent and cannot be undone.
        </p>
        <p className="text-sm text-muted-foreground">
          You can use the API key to access this scoreboard programmatically.
          Make sure to keep it secure. Documentation for the API can be found{" "}
          <Link
            href="/docs"
            className="text-blue-500 hover:underline"
          >
            here
          </Link>.
        </p>
      </form>
    </div>
  );
}