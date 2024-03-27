-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Gameplay" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "onGameEnded" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    CONSTRAINT "Gameplay_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT "Gameplay_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE RESTRICT
);
INSERT INTO "new_Gameplay" ("gameId", "id", "onGameEnded", "playerId") SELECT "gameId", "id", "onGameEnded", "playerId" FROM "Gameplay";
DROP TABLE "Gameplay";
ALTER TABLE "new_Gameplay" RENAME TO "Gameplay";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
