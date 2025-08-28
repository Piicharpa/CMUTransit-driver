-- CreateTable
CREATE TABLE "public"."driver_status" (
    "id" SERIAL NOT NULL,
    "driverId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'waiting',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "driver_status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "driver_status_driverId_key" ON "public"."driver_status"("driverId");

-- AddForeignKey
ALTER TABLE "public"."driver_status" ADD CONSTRAINT "driver_status_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "public"."drivers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
