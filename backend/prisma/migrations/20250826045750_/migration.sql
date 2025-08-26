/*
  Warnings:

  - You are about to drop the column `participantsCount` on the `Participation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Challenge" ADD COLUMN     "participantsCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."Participation" DROP COLUMN "participantsCount";
