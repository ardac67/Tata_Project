/*
  Warnings:

  - You are about to drop the column `link_of_platform` on the `media_links` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "media_links" DROP COLUMN "link_of_platform",
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "tiktok" TEXT,
ADD COLUMN     "twitter" TEXT,
ADD COLUMN     "youtube" TEXT;
