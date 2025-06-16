-- CreateTable
CREATE TABLE `Destination` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `highlights` JSON NOT NULL,
    `type` ENUM('valley', 'peak', 'lake', 'glacier', 'cultural') NOT NULL,
    `rating` DOUBLE NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TravelPackage` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `originalPrice` DOUBLE NULL,
    `discount` INTEGER NULL,
    `durationDays` INTEGER NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `destinationId` VARCHAR(191) NOT NULL,
    `images` JSON NOT NULL,
    `rating` DOUBLE NOT NULL DEFAULT 0,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `groupSize` VARCHAR(191) NOT NULL,
    `bestTime` VARCHAR(191) NOT NULL,
    `difficulty` ENUM('Easy', 'Moderate', 'Challenging', 'Difficult') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TravelPackage` ADD CONSTRAINT `TravelPackage_destinationId_fkey` FOREIGN KEY (`destinationId`) REFERENCES `Destination`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
