/*
  Warnings:

  - Added the required column `prider` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `prider` VARCHAR(191) NOT NULL;
