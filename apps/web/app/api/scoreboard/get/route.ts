import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const board = searchParams.get("board");

    if (!board) {
        return NextResponse.json(
            { error: "Missing 'board' query parameter." },
            { status: 400 }
        );
    }

    try {
        // Fetch the specific scoreboard with its scores and associated usernames
        const scoreboard = await prisma.scoreboard.findUnique({
            where: { slug: board },
            select: {
                id: true,
                name: true,
                description: true,
                owner: {
                    select: {
                        name: true,
                        website: true,
                    }
                },
                scores: {
                    orderBy: {
                        score: "desc",
                    },
                    select: {
                        username: true,
                        score: true,
                    },
                },
            },
        });

        if (!scoreboard) {
            return NextResponse.json(
                { error: "Scoreboard not found." },
                { status: 404 }
            );
        }

        return NextResponse.json({
            id: scoreboard.id,
            name: scoreboard.name,
            description: scoreboard.description,
            owner: scoreboard.owner,
            scores: scoreboard.scores,
        }, { status: 200 });
    } catch (error) {
        console.error("Error fetching scoreboard:", error);
        return NextResponse.json(
            { error: "Failed to fetch scoreboard." },
            { status: 500 }
        );
    }
}