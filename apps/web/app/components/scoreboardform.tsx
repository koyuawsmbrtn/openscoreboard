"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Switch } from "@/components/ui/switch"
import { Globe, Lock } from "lucide-react"

export function CreateScoreboardForm() {
  const [loading, setLoading] = useState(false)
  const [isPublic, setIsPublic] = useState(false)
  const router = useRouter()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    // Add API call here to create scoreboard
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const publicScoreboard = formData.get("public") === "on"
    const response = await fetch("/api/scoreboard/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        public: publicScoreboard,
      }),
    })
    const data = await response.json()
    if (!response.ok) {
      setLoading(false)
      alert(data.error || "Failed to create scoreboard")
      return
    }
    setLoading(false)
    alert("Scoreboard created successfully")

    router.push("/dashboard")
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" rows={6} />
      </div>
      <div className="flex-row items-center align-middle">
        <div className="flex items-center">
          <Switch id="public" name="public" onClick={() => setIsPublic(!isPublic)} />
          <Label htmlFor="public">
            { isPublic ? <Globe className="ml-2 h-4 w-4" /> : <Lock className="ml-2 h-4 w-4" /> }
            { isPublic ? "Public" : "Private" }
          </Label>
        </div>
        <p className="text-sm text-muted-foreground block mb-2">
          If the scoreboard is public, it will be visible to everyone that has the link.
        </p>
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Scoreboard"}
      </Button>
    </form>
  )
}