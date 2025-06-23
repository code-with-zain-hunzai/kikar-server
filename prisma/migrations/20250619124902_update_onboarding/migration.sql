-- AlterTable
ALTER TABLE `Guide` ADD COLUMN `profileImage` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Hotel` ADD COLUMN `gallery` JSON NULL,
    ADD COLUMN `profileImage` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Tourist` ADD COLUMN `profileImage` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Transporter` ADD COLUMN `profileImage` VARCHAR(191) NULL;
