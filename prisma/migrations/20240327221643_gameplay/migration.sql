/*
  Warnings:

  - You are about to drop the `GamePlayer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "GamePlayer";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Gameplay" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "onGameEnded" DATETIME NOT NULL,
    "gameId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    CONSTRAINT "Gameplay_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT "Gameplay_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT
);
