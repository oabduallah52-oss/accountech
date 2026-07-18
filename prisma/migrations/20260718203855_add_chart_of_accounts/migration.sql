-- AlterTable
ALTER TABLE "public"."Account" ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'EGP',
ADD COLUMN     "parentId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."Account" ADD CONSTRAINT "Account_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
