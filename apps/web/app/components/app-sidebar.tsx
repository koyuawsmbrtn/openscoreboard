"use client"

import * as React from "react"
import { Plus } from "lucide-react"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Logo } from "../../components/logo"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect } from "react"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = authClient.useSession()
  const user = session.data?.user
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [scoreboards, setScoreboards] = React.useState<any[]>([])
  
  useEffect(() => {
    const fetchScoreboards = async () => {
      if (user?.id) {
        try {
          const response = await fetch("/api/scoreboard/get-private", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });

          if (!response.ok) {
            console.error("Failed to fetch scoreboards:", response.statusText);
            return;
          }

          const scoreboards = await response.json();
          setScoreboards(scoreboards);
        } catch (error) {
          console.error("Error fetching scoreboards:", error);
        }
      }
    };
    fetchScoreboards();
  }, [user?.id]);
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Logo href="/dashboard" className="mx-auto mt-3" />
      </SidebarHeader>
      <SidebarContent>
        <div className="px-2 py-2">
          <div className="mb-2 flex items-center justify-between px-4">
            <h2 className="text-sm font-semibold group-data-[collapsible=icon]:hidden">Scoreboards</h2>
            <Link href="/dashboard/new">
              <Button 
                variant="ghost" 
                size="icon"
                className="h-7 w-7 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Create new scoreboard</span>
              </Button>
            </Link>
          </div>
          <nav className="grid gap-1">
            {scoreboards.map((board) => (
              <Link 
                key={board.id} 
                href={`/dashboard/edit/${board.slug}`}
                className="flex items-center gap-2 rounded-lg px-4 py-2 hover:bg-muted transition-colors"
              >
                <span className="group-data-[collapsible=icon]:hidden">{board.name}</span>
              </Link>
            ))}
            {scoreboards.length === 0 && (
              <div className="flex items-center gap-2 rounded-lg px-4 py-2 text-muted-foreground">
                <span className="group-data-[collapsible=icon]:hidden mx-auto">
                  No scoreboards found
                </span>
              </div>
            )}
          </nav>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{
          name: user?.name || user?.email || "",
          email: user?.email || "",
          avatar: user?.image || "",
        }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
