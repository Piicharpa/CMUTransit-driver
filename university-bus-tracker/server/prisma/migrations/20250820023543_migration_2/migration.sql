-- DropForeignKey
ALTER TABLE "public"."histories" DROP CONSTRAINT "histories_bus_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."histories" DROP CONSTRAINT "histories_driver_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."histories" ADD CONSTRAINT "histories_bus_id_fkey" FOREIGN KEY ("bus_id") REFERENCES "public"."buses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."histories" ADD CONSTRAINT "histories_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "public"."drivers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
