-- AlterTable
ALTER TABLE `Guide` MODIFY `tourTypes` JSON NULL,
    MODIFY `maxGroupSize` VARCHAR(191) NULL,
    MODIFY `hourlyRate` VARCHAR(191) NULL,
    MODIFY `dailyRate` VARCHAR(191) NULL,
    MODIFY `availability` JSON NULL;

-- AlterTable
ALTER TABLE `Hotel` MODIFY `address` VARCHAR(191) NULL,
    MODIFY `city` VARCHAR(191) NULL,
    MODIFY `state` VARCHAR(191) NULL,
    MODIFY `zipCode` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL,
    MODIFY `amenities` JSON NULL,
    MODIFY `services` JSON NULL,
    MODIFY `totalRooms` VARCHAR(191) NULL,
    MODIFY `roomTypes` JSON NULL,
    MODIFY `basePrice` VARCHAR(191) NULL,
    MODIFY `currency` VARCHAR(191) NULL,
    MODIFY `policies` VARCHAR(191) NULL;
