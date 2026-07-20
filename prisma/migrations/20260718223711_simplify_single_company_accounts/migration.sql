/*
  Warnings:

  - You are about to drop the column `companyId` on the `Account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Account" DROP CONSTRAINT "Account_companyId_fkey";

-- AlterTable
ALTER TABLE "public"."Account" DROP COLUMN "companyId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."Company" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Account_code_key" ON "public"."Account"("code");

-- CreateIndex
CREATE INDEX "Account_parentId_idx" ON "public"."Account"("parentId");

-- CreateIndex
CREATE INDEX "Account_type_idx" ON "public"."Account"("type");
