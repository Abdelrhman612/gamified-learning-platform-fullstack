-- CreateEnum
CREATE TYPE "public"."role" AS ENUM ('user', 'admin');

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'user';
