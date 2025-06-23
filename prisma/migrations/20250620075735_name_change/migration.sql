/*
  Warnings:

  - Made the column `name` on table `Transporter` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Tourist` MODIFY `country` VARCHAR(191) NULL,
    MODIFY `budget` VARCHAR(191) NULL,
    MODIFY `frequency` VARCHAR(191) NULL,
    MODIFY `groupSize` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Transporter` MODIFY `serviceArea` VARCHAR(191) NULL,
    MODIFY `fleetSize` VARCHAR(191) NULL,
    MODIFY `maxCapacity` VARCHAR(191) NULL,
    MODIFY `businessLicense` VARCHAR(191) NULL,
    MODIFY `name` VARCHAR(191) NOT NULL;
