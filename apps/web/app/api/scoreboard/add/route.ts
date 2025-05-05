import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
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
    const { name, description } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    // Create the scoreboard
    const newScoreboard = await prisma.scoreboard.create({
      data: {
        id: crypto.randomUUID(),
        name,
        description: description || null,
        owner: { connect: { id: session.user.id } },
        createdAt: new Date(),
        updatedAt: new Date(),
        apiKey: crypto.randomUUID(),
        slug: name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")
          .substring(0, 50),
      },
    });

    return NextResponse.json(newScoreboard, { status: 201 });
  } catch (error) {
    console.error("Error creating scoreboard:", error);
    return NextResponse.json(
      { error: "Failed to create scoreboard. The name is most likely already taken." },
      { status: 500 }
    );
  }
}