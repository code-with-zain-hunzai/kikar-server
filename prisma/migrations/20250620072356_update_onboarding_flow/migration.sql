/*
  Warnings:

  - You are about to drop the column `firstName` on the `Guide` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Guide` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Tourist` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Tourist` table. All the data in the column will be lost.
  - You are about to drop the column `ownerName` on the `Transporter` table. All the data in the column will be lost.
  - Added the required column `name` to the `Guide` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Guide` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Tourist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Guide` DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Hotel` ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Tourist` DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Transporter` DROP COLUMN `ownerName`,
    ADD COLUMN `name` VARCHAR(191) NULL;
