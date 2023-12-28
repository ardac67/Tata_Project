/*
  Warnings:

  - The `campaign_image` column on the `campaign` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "campaign" DROP COLUMN "campaign_image",
ADD COLUMN     "campaign_image" BYTEA;
