-- AlterTable
ALTER TABLE "user" ADD COLUMN     "website" TEXT;

-- CreateTable
CREATE TABLE "scores" (
    "id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "scoreboardId" TEXT NOT NULL,

    CONSTRAINT "scores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scoreboard" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" TEXT NOT NULL,
    "apikey" TEXT,
    "public" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,

    CONSTRAINT "scoreboard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "scoreboard_apikey_key" ON "scoreboard"("apikey");

-- AddForeignKey
ALTER TABLE "scores" ADD CONSTRAINT "scores_scoreboardId_fkey" FOREIGN KEY ("scoreboardId") REFERENCES "scoreboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scoreboard" ADD CONSTRAINT "scoreboard_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
