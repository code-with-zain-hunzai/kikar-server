-- AlterTable
ALTER TABLE `Guide` ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'guide';

-- AlterTable
ALTER TABLE `Hotel` ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'hotel';

-- AlterTable
ALTER TABLE `Tourist` ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'tourist';

-- AlterTable
ALTER TABLE `Transporter` ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'transporter';
