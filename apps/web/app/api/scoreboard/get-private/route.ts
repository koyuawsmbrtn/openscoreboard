import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    // Authenticate the user
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    // Fetch all scoreboards owned by the authenticated user
    const scoreboards = await prisma.scoreboard.findMany({
      where: {
        ownerId: session.user.id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        apiKey: true,
        slug: true,
      },
    });

    return NextResponse.json(scoreboards, { status: 200 });
  } catch (error) {
    console.error("Error fetching user-owned scoreboards:", error);
    return NextResponse.json(
      { error: "Failed to fetch scoreboards." },
      { status: 500 }
    );
  }
}