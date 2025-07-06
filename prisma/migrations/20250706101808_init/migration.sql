-- CreateTable
CREATE TABLE "Objet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "serialNumber" TEXT NOT NULL,
    "reparationNumberId" INTEGER NOT NULL,
    CONSTRAINT "Objet_reparationNumberId_fkey" FOREIGN KEY ("reparationNumberId") REFERENCES "ReparationNumber" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Commande" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero" TEXT NOT NULL,
    "clientId" INTEGER NOT NULL,
    CONSTRAINT "Commande_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ObjectType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Mesure" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mesuredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "conformity" BOOLEAN NOT NULL DEFAULT false,
    "objetId" INTEGER NOT NULL,
    CONSTRAINT "Mesure_objetId_fkey" FOREIGN KEY ("objetId") REFERENCES "Objet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Certificat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "objetId" INTEGER NOT NULL,
    CONSTRAINT "Certificat_objetId_fkey" FOREIGN KEY ("objetId") REFERENCES "Objet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReparationNumber" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "commandeId" INTEGER NOT NULL,
    "objectTypeId" INTEGER NOT NULL,
    CONSTRAINT "ReparationNumber_commandeId_fkey" FOREIGN KEY ("commandeId") REFERENCES "Commande" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ReparationNumber_objectTypeId_fkey" FOREIGN KEY ("objectTypeId") REFERENCES "ObjectType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Objet_serialNumber_key" ON "Objet"("serialNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Objet_reparationNumberId_key" ON "Objet"("reparationNumberId");

-- CreateIndex
CREATE UNIQUE INDEX "Commande_numero_key" ON "Commande"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "Commande_clientId_key" ON "Commande"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "Client_name_key" ON "Client"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ObjectType_name_key" ON "ObjectType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Mesure_objetId_key" ON "Mesure"("objetId");

-- CreateIndex
CREATE UNIQUE INDEX "Certificat_objetId_key" ON "Certificat"("objetId");

-- CreateIndex
CREATE UNIQUE INDEX "ReparationNumber_commandeId_key" ON "ReparationNumber"("commandeId");

-- CreateIndex
CREATE UNIQUE INDEX "ReparationNumber_objectTypeId_key" ON "ReparationNumber"("objectTypeId");
