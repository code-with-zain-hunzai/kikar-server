/*
  Warnings:

  - Added the required column `password` to the `Tourist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Transporter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Tourist` ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Transporter` ADD COLUMN `password` VARCHAR(191) NOT NULL;
