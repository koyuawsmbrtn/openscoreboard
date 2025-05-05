import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function DELETE(req: Request) {
  try {
    // Authenticate the user
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { error: "Missing 'slug' query parameter." },
        { status: 400 }
      );
    }

    // Find the scoreboard by slug
    const scoreboard = await prisma.scoreboard.findUnique({
      where: { slug },
    });

    if (!scoreboard) {
      return NextResponse.json(
        { error: "Scoreboard not found." },
        { status: 404 }
      );
    }

    // Check if the authenticated user is the owner of the scoreboard
    if (scoreboard.ownerId !== session.user.id) {
      return NextResponse.json(
        { error: "You are not authorized to delete this scoreboard." },
        { status: 403 }
      );
    }

    // Delete the scoreboard
    await prisma.scoreboard.delete({
      where: { slug },
    });

    return NextResponse.json(
      { message: "Scoreboard deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting scoreboard:", error);
    return NextResponse.json(
      { error: "Failed to delete scoreboard." },
      { status: 500 }
    );
  }
}