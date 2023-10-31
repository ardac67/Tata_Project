/*
  Warnings:

  - You are about to drop the column `link` on the `media_links` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "media_links" DROP COLUMN "link",
ADD COLUMN     "link_of_platform" TEXT;
