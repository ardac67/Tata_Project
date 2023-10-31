/*
  Warnings:

  - You are about to drop the column `advertiser_user_id` on the `collaboration_pref` table. All the data in the column will be lost.
  - You are about to drop the column `influencer_user_id` on the `collaboration_pref` table. All the data in the column will be lost.
  - You are about to drop the column `advertiser_user_id` on the `contact` table. All the data in the column will be lost.
  - You are about to drop the column `influencer_user_id` on the `contact` table. All the data in the column will be lost.
  - You are about to drop the column `advertiser_user_id` on the `media_links` table. All the data in the column will be lost.
  - You are about to drop the column `influencer_user_id` on the `media_links` table. All the data in the column will be lost.
  - You are about to drop the `advertiser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `campaign_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `influencer` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `contact` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `collaboration_pref` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscribers` to the `media_links` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `media_links` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "collaboration_pref" DROP CONSTRAINT "collaboration_pref_advertiser_user_id_fkey";

-- DropForeignKey
ALTER TABLE "collaboration_pref" DROP CONSTRAINT "collaboration_pref_influencer_user_id_fkey";

-- DropForeignKey
ALTER TABLE "contact" DROP CONSTRAINT "contact_advertiser_user_id_fkey";

-- DropForeignKey
ALTER TABLE "contact" DROP CONSTRAINT "contact_influencer_user_id_fkey";

-- DropForeignKey
ALTER TABLE "media_links" DROP CONSTRAINT "media_links_advertiser_user_id_fkey";

-- DropForeignKey
ALTER TABLE "media_links" DROP CONSTRAINT "media_links_influencer_user_id_fkey";

-- DropIndex
DROP INDEX "contact_advertiser_user_id_key";

-- DropIndex
DROP INDEX "contact_influencer_user_id_key";

-- DropIndex
DROP INDEX "media_links_advertiser_user_id_key";

-- DropIndex
DROP INDEX "media_links_influencer_user_id_key";

-- AlterTable
ALTER TABLE "collaboration_pref" DROP COLUMN "advertiser_user_id",
DROP COLUMN "influencer_user_id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "contact" DROP COLUMN "advertiser_user_id",
DROP COLUMN "influencer_user_id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "media_links" DROP COLUMN "advertiser_user_id",
DROP COLUMN "influencer_user_id",
ADD COLUMN     "subscribers" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "advertiser";

-- DropTable
DROP TABLE "campaign_details";

-- DropTable
DROP TABLE "influencer";

-- CreateTable
CREATE TABLE "user" (
    "user_id" TEXT NOT NULL,
    "user_name" VARCHAR(50) NOT NULL,
    "password" TEXT NOT NULL,
    "Type" TEXT NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "industry" VARCHAR(500) NOT NULL,
    "location" VARCHAR(500) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "audience_demography" (
    "demograph_id" TEXT NOT NULL,
    "age_interval" TEXT NOT NULL,
    "gender_information" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "audience_demography_pkey" PRIMARY KEY ("demograph_id")
);

-- CreateTable
CREATE TABLE "auidence_interests" (
    "interest_id" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "demography_id" TEXT NOT NULL,

    CONSTRAINT "auidence_interests_pkey" PRIMARY KEY ("interest_id")
);

-- CreateTable
CREATE TABLE "collaboration_history" (
    "collaboration_hist_id" TEXT NOT NULL,
    "description" VARCHAR(200) NOT NULL,
    "outcomes" VARCHAR(200) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "collaboration_history_pkey" PRIMARY KEY ("collaboration_hist_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contact_user_id_key" ON "contact"("user_id");

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_links" ADD CONSTRAINT "media_links_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collaboration_pref" ADD CONSTRAINT "collaboration_pref_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audience_demography" ADD CONSTRAINT "audience_demography_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auidence_interests" ADD CONSTRAINT "auidence_interests_demography_id_fkey" FOREIGN KEY ("demography_id") REFERENCES "audience_demography"("demograph_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collaboration_history" ADD CONSTRAINT "collaboration_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
