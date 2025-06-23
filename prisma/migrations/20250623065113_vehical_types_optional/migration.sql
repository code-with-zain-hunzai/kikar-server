-- AlterTable
ALTER TABLE `Transporter` MODIFY `vehicleTypes` JSON NULL,
    MODIFY `serviceTypes` JSON NULL,
    MODIFY `insurance` VARCHAR(191) NULL;
