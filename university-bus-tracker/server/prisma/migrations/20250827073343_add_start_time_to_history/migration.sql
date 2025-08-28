/*
  Warnings:

  - The primary key for the `histories` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "public"."histories" DROP CONSTRAINT "histories_pkey",
ADD CONSTRAINT "histories_pkey" PRIMARY KEY ("id");
