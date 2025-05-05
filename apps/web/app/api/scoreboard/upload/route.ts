import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { apiKey, username, score } = body;

    // Validate input
    if (!apiKey || !username || typeof score !== "number") {
      return NextResponse.json(
        { error: "API key, username, and score are required." },
        { status: 400 }
      );
    }

    // Find the scoreboard by API key
    const scoreboard = await prisma.scoreboard.findUnique({
      where: { apiKey },
    });

    if (!scoreboard) {
      return NextResponse.json(
        { error: "Invalid API key or scoreboard not found." },
        { status: 404 }
      );
    }

    // Check if the score already exists for the username
    const existingScore = await prisma.score.findFirst({
      where: {
        AND: [
          { scoreboardId: scoreboard.id },
          { username },
        ],
      },
    });

    // Only update if the new score is higher
    if (existingScore && existingScore.score >= score) {
      return NextResponse.json(
        { message: "Score not updated. Existing score is higher or equal." },
        { status: 200 }
      );
    }

    // Upsert the score (insert or update)
    const upsertedScore = await prisma.score.upsert({
      where: {
        id: existingScore ? existingScore.id : crypto.randomUUID(),
      },
      update: {
        score,
        updatedAt: new Date(),
      },
      create: {
        id: crypto.randomUUID(),
        scoreboardId: scoreboard.id,
        username,
        score,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Upsert the score to the scoreboard
    await prisma.scoreboard.update({
      where: { id: scoreboard.id },
      data: {
        updatedAt: new Date(),
        scores: {
          connectOrCreate: {
            where: { id: upsertedScore.id },
            create: {
              id: upsertedScore.id,
              scoreboardId: scoreboard.id,
              username,
              score,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
        },
      },
    });

    return NextResponse.json(upsertedScore, { status: 200 });
  } catch (error) {
    console.error("Error upserting score:", error);
    return NextResponse.json(
      { error: "Failed to upsert score." },
      { status: 500 }
    );
  }
}