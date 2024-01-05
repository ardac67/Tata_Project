/*
  Warnings:

  - You are about to drop the column `location` on the `audience_demography` table. All the data in the column will be lost.
  - You are about to drop the column `so_status` on the `audience_demography` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "audience_demography" DROP COLUMN "location",
DROP COLUMN "so_status";
