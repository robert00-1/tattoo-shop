/*
  Warnings:

  - You are about to drop the column `dayOfWeek` on the `ServiceAvailability` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ServiceAvailability" DROP COLUMN "dayOfWeek",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
