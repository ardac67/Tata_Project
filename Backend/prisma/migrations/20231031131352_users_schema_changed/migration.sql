/*
  Warnings:

  - You are about to drop the `audience_demography` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `auidence_interests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `campaign` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `campaing_tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `collaboration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `collaboration_history` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `collaboration_pref` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `proposal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `review_history` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "audience_demography" DROP CONSTRAINT "audience_demography_user_id_fkey";

-- DropForeignKey
ALTER TABLE "auidence_interests" DROP CONSTRAINT "auidence_interests_demography_id_fkey";

-- DropForeignKey
ALTER TABLE "campaign" DROP CONSTRAINT "campaign_user_id_fkey";

-- DropForeignKey
ALTER TABLE "campaing_tags" DROP CONSTRAINT "campaing_tags_campaign_id_fkey";

-- DropForeignKey
ALTER TABLE "collaboration" DROP CONSTRAINT "collaboration_campaign_id_fkey";

-- DropForeignKey
ALTER TABLE "collaboration" DROP CONSTRAINT "collaboration_user_id_fkey";

-- DropForeignKey
ALTER TABLE "collaboration_history" DROP CONSTRAINT "collaboration_history_user_id_fkey";

-- DropForeignKey
ALTER TABLE "collaboration_pref" DROP CONSTRAINT "collaboration_pref_user_id_fkey";

-- DropForeignKey
ALTER TABLE "proposal" DROP CONSTRAINT "proposal_campaign_id_fkey";

-- DropForeignKey
ALTER TABLE "proposal" DROP CONSTRAINT "proposal_user_id_fkey";

-- DropForeignKey
ALTER TABLE "review_history" DROP CONSTRAINT "review_history_campaign_id_fkey";

-- DropForeignKey
ALTER TABLE "review_history" DROP CONSTRAINT "review_history_user_id_fkey";

-- DropTable
DROP TABLE "audience_demography";

-- DropTable
DROP TABLE "auidence_interests";

-- DropTable
DROP TABLE "campaign";

-- DropTable
DROP TABLE "campaing_tags";

-- DropTable
DROP TABLE "collaboration";

-- DropTable
DROP TABLE "collaboration_history";

-- DropTable
DROP TABLE "collaboration_pref";

-- DropTable
DROP TABLE "proposal";

-- DropTable
DROP TABLE "review_history";
