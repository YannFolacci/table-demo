/*
  Warnings:

  - You are about to drop the column `conformity` on the `Mesure` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Mesure" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mesuredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "compliance" BOOLEAN NOT NULL DEFAULT false,
    "objetId" INTEGER NOT NULL,
    CONSTRAINT "Mesure_objetId_fkey" FOREIGN KEY ("objetId") REFERENCES "Objet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Mesure" ("id", "mesuredAt", "objetId") SELECT "id", "mesuredAt", "objetId" FROM "Mesure";
DROP TABLE "Mesure";
ALTER TABLE "new_Mesure" RENAME TO "Mesure";
CREATE UNIQUE INDEX "Mesure_objetId_key" ON "Mesure"("objetId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
