-- CreateEnum
CREATE TYPE "DestinationType" AS ENUM ('valley', 'peak', 'lake', 'glacier', 'cultural');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('Easy', 'Moderate', 'Challenging', 'Difficult');

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Destination" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "highlights" JSONB NOT NULL DEFAULT '[]',
    "type" "DestinationType" NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Destination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TravelPackage" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "originalPrice" DOUBLE PRECISION,
    "discount" INTEGER,
    "durationDays" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "groupSize" TEXT NOT NULL,
    "bestTime" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TravelPackage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guide" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "languages" JSONB NOT NULL,
    "certifications" TEXT,
    "tourTypes" JSONB,
    "specialties" TEXT,
    "maxGroupSize" TEXT,
    "hourlyRate" TEXT,
    "dailyRate" TEXT,
    "availability" JSONB,
    "bio" TEXT,
    "idCardFront" TEXT,
    "idCardBack" TEXT,
    "role" TEXT NOT NULL DEFAULT 'guide',
    "profileImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Guide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hotel" (
    "id" TEXT NOT NULL,
    "hotelName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "hotelType" TEXT NOT NULL,
    "starRating" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "certificateFile" TEXT,
    "cnicFront" TEXT,
    "cnicBack" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipCode" TEXT,
    "country" TEXT NOT NULL,
    "description" TEXT,
    "amenities" JSONB,
    "services" JSONB,
    "totalRooms" TEXT,
    "roomTypes" JSONB,
    "basePrice" TEXT,
    "currency" TEXT,
    "policies" TEXT,
    "role" TEXT NOT NULL DEFAULT 'hotel',
    "profileImage" TEXT,
    "gallery" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tourist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "country" TEXT,
    "cnicFront" TEXT,
    "cnicBack" TEXT,
    "travelStyle" TEXT,
    "interests" JSONB,
    "budget" TEXT,
    "frequency" TEXT,
    "groupSize" TEXT,
    "role" TEXT NOT NULL DEFAULT 'tourist',
    "profileImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Tourist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transporter" (
    "id" TEXT NOT NULL,
    "businessName" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "serviceArea" TEXT,
    "vehicleTypes" JSONB,
    "serviceTypes" JSONB,
    "fleetSize" TEXT,
    "maxCapacity" TEXT,
    "businessLicense" TEXT,
    "driverLicense" TEXT NOT NULL,
    "insurance" TEXT,
    "certifications" TEXT,
    "cnicFront" TEXT,
    "cnicBack" TEXT,
    "role" TEXT NOT NULL DEFAULT 'transporter',
    "profileImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Transporter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Destination_name_key" ON "Destination"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Guide_email_key" ON "Guide"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Hotel_email_key" ON "Hotel"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tourist_email_key" ON "Tourist"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Transporter_email_key" ON "Transporter"("email");
