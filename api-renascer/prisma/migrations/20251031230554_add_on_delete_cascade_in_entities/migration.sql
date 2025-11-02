-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_collections" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "supplierId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Scheduled',
    "dateTime" DATETIME NOT NULL,
    "location" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "value" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "collections_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "collections_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product_types" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_collections" ("createdAt", "dateTime", "id", "location", "productId", "status", "supplierId", "updatedAt", "value", "weight") SELECT "createdAt", "dateTime", "id", "location", "productId", "status", "supplierId", "updatedAt", "value", "weight" FROM "collections";
DROP TABLE "collections";
ALTER TABLE "new_collections" RENAME TO "collections";
CREATE TABLE "new_sales" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clientId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "dateTime" DATETIME NOT NULL,
    "weight" REAL NOT NULL,
    "value" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "sales_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "sales_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product_types" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_sales" ("clientId", "createdAt", "dateTime", "id", "productId", "updatedAt", "value", "weight") SELECT "clientId", "createdAt", "dateTime", "id", "productId", "updatedAt", "value", "weight" FROM "sales";
DROP TABLE "sales";
ALTER TABLE "new_sales" RENAME TO "sales";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
