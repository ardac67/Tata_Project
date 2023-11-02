/*
  Warnings:

  - You are about to drop the column `platform` on the `media_links` table. All the data in the column will be lost.
  - You are about to drop the column `subscribers` on the `media_links` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "media_links" DROP COLUMN "platform",
DROP COLUMN "subscribers";
