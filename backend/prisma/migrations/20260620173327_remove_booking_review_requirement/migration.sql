/*
  Warnings:

  - You are about to drop the column `bookingId` on the `Review` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[serviceId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_bookingId_fkey";

-- DropIndex
DROP INDEX "Review_bookingId_key";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "bookingId";

-- CreateIndex
CREATE UNIQUE INDEX "Review_serviceId_key" ON "Review"("serviceId");
