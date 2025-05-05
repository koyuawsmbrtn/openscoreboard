"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function CreateScoreboardForm() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    // Add API call here to create scoreboard
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const response = await fetch("/api/scoreboard/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
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

    router.push("/dashboard/edit/" + data.slug)
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
      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Scoreboard"}
      </Button>
    </form>
  )
}