/*
  Warnings:

  - You are about to drop the `Badge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserBadge` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Participation" DROP CONSTRAINT "Participation_challengeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Participation" DROP CONSTRAINT "Participation_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserBadge" DROP CONSTRAINT "UserBadge_badgeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserBadge" DROP CONSTRAINT "UserBadge_userId_fkey";

-- DropTable
DROP TABLE "public"."Badge";

-- DropTable
DROP TABLE "public"."UserBadge";

-- AddForeignKey
ALTER TABLE "public"."Participation" ADD CONSTRAINT "Participation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Participation" ADD CONSTRAINT "Participation_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "public"."Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;
