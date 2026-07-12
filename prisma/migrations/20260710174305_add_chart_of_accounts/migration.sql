-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "accountType" TEXT NOT NULL,
    "normalBalance" TEXT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "parentId" INTEGER,
    "companyId" INTEGER,
    "branchId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Account_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Account" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Account_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Account_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Account" ("accountType", "code", "createdAt", "currency", "id", "isActive", "name", "normalBalance", "parentId", "updatedAt") SELECT "accountType", "code", "createdAt", coalesce("currency", 'USD') AS "currency", "id", "isActive", "name", "normalBalance", "parentId", "updatedAt" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE UNIQUE INDEX "Account_code_key" ON "Account"("code");
CREATE TABLE "new_Branch" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "airport" TEXT,
    "country" TEXT,
    "city" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "companyId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Branch_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Branch" ("address", "code", "companyId", "createdAt", "id", "name", "updatedAt") SELECT "address", "code", "companyId", "createdAt", "id", "name", "updatedAt" FROM "Branch";
DROP TABLE "Branch";
ALTER TABLE "new_Branch" RENAME TO "Branch";
CREATE UNIQUE INDEX "Branch_code_key" ON "Branch"("code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
