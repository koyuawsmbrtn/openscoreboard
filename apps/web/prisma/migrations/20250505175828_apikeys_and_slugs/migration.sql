/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Scoreboard` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[apiKey]` on the table `Scoreboard` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Scoreboard" ADD COLUMN     "apiKey" TEXT,
ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Scoreboard_slug_key" ON "Scoreboard"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Scoreboard_apiKey_key" ON "Scoreboard"("apiKey");
