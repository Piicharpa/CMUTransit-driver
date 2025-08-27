/*
  Warnings:

  - You are about to drop the column `created_at` on the `histories` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `histories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."histories" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "end_time" TIMESTAMP(3),
ADD COLUMN     "start_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
