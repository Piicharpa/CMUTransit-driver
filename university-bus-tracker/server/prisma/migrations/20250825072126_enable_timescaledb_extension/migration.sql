/*
  Warnings:

  - The primary key for the `histories` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/


-- AlterTable
ALTER TABLE "public"."histories" DROP CONSTRAINT "histories_pkey",
ALTER COLUMN "start_time" DROP DEFAULT,
ADD CONSTRAINT "histories_pkey" PRIMARY KEY ("id", "start_time");

CREATE UNIQUE INDEX IF NOT EXISTS uniq_active_session_per_bus
ON "histories" ("bus_id", "start_time")
WHERE "end_time" IS NULL;
