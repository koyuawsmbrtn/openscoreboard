/*
  Warnings:

  - You are about to drop the `scoreboard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "scoreboard" DROP CONSTRAINT "scoreboard_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "scores" DROP CONSTRAINT "scores_scoreboardId_fkey";

-- DropTable
DROP TABLE "scoreboard";

-- CreateTable
CREATE TABLE "Scoreboard" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "public" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Scoreboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ScoreboardScores" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ScoreboardScores_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ScoreboardScores_B_index" ON "_ScoreboardScores"("B");

-- AddForeignKey
ALTER TABLE "Scoreboard" ADD CONSTRAINT "Scoreboard_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScoreboardScores" ADD CONSTRAINT "_ScoreboardScores_A_fkey" FOREIGN KEY ("A") REFERENCES "scores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScoreboardScores" ADD CONSTRAINT "_ScoreboardScores_B_fkey" FOREIGN KEY ("B") REFERENCES "Scoreboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
