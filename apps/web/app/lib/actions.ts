"use server"

import { prisma } from "./prisma"

export async function getScoreboards(userId: string) {
  return await prisma.scoreboard.findMany({
    where: {
      ownerId: userId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}