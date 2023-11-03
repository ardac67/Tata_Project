/*
  Warnings:

  - You are about to drop the column `description` on the `campaing_tags` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "campaing_tags" DROP COLUMN "description",
ADD COLUMN     "tag1" TEXT,
ADD COLUMN     "tag2" TEXT,
ADD COLUMN     "tag3" TEXT,
ADD COLUMN     "tag4" TEXT,
ADD COLUMN     "tag5" TEXT;
