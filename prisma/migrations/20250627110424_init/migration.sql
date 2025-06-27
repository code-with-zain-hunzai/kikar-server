-- CreateTable
CREATE TABLE `Admin` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'admin',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Destination` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `image` TEXT NULL,
    `highlights` JSON NOT NULL,
    `type` ENUM('valley', 'peak', 'lake', 'glacier', 'cultural') NOT NULL,
    `rating` DOUBLE NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Destination_name_key`(`name`),
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
    `destination` VARCHAR(191) NOT NULL,
    `images` TEXT NOT NULL,
    `rating` DOUBLE NOT NULL DEFAULT 0,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `groupSize` VARCHAR(191) NOT NULL,
    `bestTime` VARCHAR(191) NOT NULL,
    `difficulty` ENUM('Easy', 'Moderate', 'Challenging', 'Difficult') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contact` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `message` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Guide` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `experience` VARCHAR(191) NOT NULL,
    `languages` JSON NOT NULL,
    `certifications` VARCHAR(191) NULL,
    `tourTypes` JSON NULL,
    `specialties` VARCHAR(191) NULL,
    `maxGroupSize` VARCHAR(191) NULL,
    `hourlyRate` VARCHAR(191) NULL,
    `dailyRate` VARCHAR(191) NULL,
    `availability` JSON NULL,
    `bio` VARCHAR(191) NULL,
    `idCardFront` VARCHAR(191) NULL,
    `idCardBack` VARCHAR(191) NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'guide',
    `profileImage` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Guide_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hotel` (
    `id` VARCHAR(191) NOT NULL,
    `hotelName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `hotelType` VARCHAR(191) NOT NULL,
    `starRating` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `certificateFile` VARCHAR(191) NULL,
    `cnicFront` VARCHAR(191) NULL,
    `cnicBack` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `state` VARCHAR(191) NULL,
    `zipCode` VARCHAR(191) NULL,
    `country` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `amenities` JSON NULL,
    `services` JSON NULL,
    `totalRooms` VARCHAR(191) NULL,
    `roomTypes` JSON NULL,
    `basePrice` VARCHAR(191) NULL,
    `currency` VARCHAR(191) NULL,
    `policies` VARCHAR(191) NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'hotel',
    `profileImage` VARCHAR(191) NULL,
    `gallery` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Hotel_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tourist` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NULL,
    `cnicFront` VARCHAR(191) NULL,
    `cnicBack` VARCHAR(191) NULL,
    `travelStyle` VARCHAR(191) NULL,
    `interests` JSON NULL,
    `budget` VARCHAR(191) NULL,
    `frequency` VARCHAR(191) NULL,
    `groupSize` VARCHAR(191) NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'tourist',
    `profileImage` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Tourist_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transporter` (
    `id` VARCHAR(191) NOT NULL,
    `businessName` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `serviceArea` VARCHAR(191) NULL,
    `vehicleTypes` JSON NULL,
    `serviceTypes` JSON NULL,
    `fleetSize` VARCHAR(191) NULL,
    `maxCapacity` VARCHAR(191) NULL,
    `businessLicense` VARCHAR(191) NULL,
    `driverLicense` VARCHAR(191) NOT NULL,
    `insurance` VARCHAR(191) NULL,
    `certifications` VARCHAR(191) NULL,
    `cnicFront` VARCHAR(191) NULL,
    `cnicBack` VARCHAR(191) NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'transporter',
    `profileImage` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Transporter_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
