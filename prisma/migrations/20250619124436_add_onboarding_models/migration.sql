-- CreateTable
CREATE TABLE `Guide` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `experience` VARCHAR(191) NOT NULL,
    `languages` JSON NOT NULL,
    `certifications` VARCHAR(191) NULL,
    `tourTypes` JSON NOT NULL,
    `specialties` VARCHAR(191) NULL,
    `maxGroupSize` VARCHAR(191) NOT NULL,
    `hourlyRate` VARCHAR(191) NOT NULL,
    `dailyRate` VARCHAR(191) NOT NULL,
    `availability` JSON NOT NULL,
    `bio` VARCHAR(191) NULL,
    `idCardFront` VARCHAR(191) NULL,
    `idCardBack` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Guide_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hotel` (
    `id` VARCHAR(191) NOT NULL,
    `hotelName` VARCHAR(191) NOT NULL,
    `hotelType` VARCHAR(191) NOT NULL,
    `starRating` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `certificateCountry` VARCHAR(191) NOT NULL,
    `certificateFile` VARCHAR(191) NULL,
    `cnicFront` VARCHAR(191) NULL,
    `cnicBack` VARCHAR(191) NULL,
    `address` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `zipCode` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `amenities` JSON NOT NULL,
    `services` JSON NOT NULL,
    `totalRooms` VARCHAR(191) NOT NULL,
    `roomTypes` JSON NOT NULL,
    `basePrice` VARCHAR(191) NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `policies` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Hotel_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tourist` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `cnicFront` VARCHAR(191) NULL,
    `cnicBack` VARCHAR(191) NULL,
    `travelStyle` VARCHAR(191) NOT NULL,
    `interests` JSON NOT NULL,
    `budget` VARCHAR(191) NOT NULL,
    `frequency` VARCHAR(191) NOT NULL,
    `groupSize` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Tourist_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transporter` (
    `id` VARCHAR(191) NOT NULL,
    `businessName` VARCHAR(191) NOT NULL,
    `ownerName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `serviceArea` VARCHAR(191) NOT NULL,
    `vehicleTypes` JSON NOT NULL,
    `serviceTypes` JSON NOT NULL,
    `fleetSize` VARCHAR(191) NOT NULL,
    `maxCapacity` VARCHAR(191) NOT NULL,
    `businessLicense` VARCHAR(191) NOT NULL,
    `driverLicense` VARCHAR(191) NOT NULL,
    `insurance` VARCHAR(191) NOT NULL,
    `certifications` VARCHAR(191) NULL,
    `cnicFront` VARCHAR(191) NULL,
    `cnicBack` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Transporter_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
