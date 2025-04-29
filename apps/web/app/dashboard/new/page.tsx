import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreateScoreboardForm } from "@/components/scoreboardform"

export default function NewScoreboardPage() {
  return (
    <div className="container max-w-2xl py-8 mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create New Scoreboard</CardTitle>
          <CardDescription>
            Set up a new scoreboard for your game
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateScoreboardForm />
        </CardContent>
      </Card>
    </div>
  )
}