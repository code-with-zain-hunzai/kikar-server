/*
  Warnings:

  - You are about to drop the column `destinationId` on the `TravelPackage` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Destination` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `destination` to the `TravelPackage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `TravelPackage` DROP FOREIGN KEY `TravelPackage_destinationId_fkey`;

-- DropIndex
DROP INDEX `TravelPackage_destinationId_fkey` ON `TravelPackage`;

-- AlterTable
ALTER TABLE `TravelPackage` DROP COLUMN `destinationId`,
    ADD COLUMN `destination` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Destination_name_key` ON `Destination`(`name`);
