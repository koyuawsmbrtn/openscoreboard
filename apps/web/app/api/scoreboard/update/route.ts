import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function PATCH(req: Request) {
  try {
    // Authenticate the user
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { id, name, description, apiKey } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Scoreboard ID is required." },
        { status: 400 }
      );
    }

    // Check if the scoreboard exists and belongs to the authenticated user
    const scoreboard = await prisma.scoreboard.findUnique({
      where: { id },
    });

    if (!scoreboard) {
      return NextResponse.json(
        { error: "Scoreboard not found." },
        { status: 404 }
      );
    }

    if (scoreboard.ownerId !== session.user.id) {
      return NextResponse.json(
        { error: "You are not authorized to update this scoreboard." },
        { status: 403 }
      );
    }

    // Update the scoreboard
    const updatedScoreboard = await prisma.scoreboard.update({
      where: { id },
      data: {
        name: name || scoreboard.name,
        description: description || scoreboard.description,
        apiKey: apiKey || scoreboard.apiKey,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedScoreboard, { status: 200 });
  } catch (error) {
    console.error("Error updating scoreboard:", error);
    return NextResponse.json(
      { error: "Failed to update scoreboard." },
      { status: 500 }
    );
  }
}