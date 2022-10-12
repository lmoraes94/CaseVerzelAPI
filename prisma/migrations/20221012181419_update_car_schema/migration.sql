/*
  Warnings:

  - You are about to drop the column `marca` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `modelo` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `car` table. All the data in the column will be lost.
  - Added the required column `brand` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `car` DROP COLUMN `marca`,
    DROP COLUMN `modelo`,
    DROP COLUMN `nome`,
    ADD COLUMN `brand` VARCHAR(191) NOT NULL,
    ADD COLUMN `model` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `price` VARCHAR(191) NOT NULL;
