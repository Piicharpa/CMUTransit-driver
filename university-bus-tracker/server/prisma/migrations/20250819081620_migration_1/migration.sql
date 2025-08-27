-- DropForeignKey
ALTER TABLE "public"."reports" DROP CONSTRAINT "reports_student_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."reports" ADD CONSTRAINT "reports_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE CASCADE ON UPDATE CASCADE;
