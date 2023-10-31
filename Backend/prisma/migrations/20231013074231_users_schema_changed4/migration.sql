-- DropForeignKey
ALTER TABLE "audience_demography" DROP CONSTRAINT "audience_demography_user_id_fkey";

-- DropForeignKey
ALTER TABLE "auidence_interests" DROP CONSTRAINT "auidence_interests_demography_id_fkey";

-- DropForeignKey
ALTER TABLE "collaboration_history" DROP CONSTRAINT "collaboration_history_user_id_fkey";

-- DropForeignKey
ALTER TABLE "collaboration_pref" DROP CONSTRAINT "collaboration_pref_user_id_fkey";

-- DropForeignKey
ALTER TABLE "media_links" DROP CONSTRAINT "media_links_user_id_fkey";

-- AlterTable
ALTER TABLE "audience_demography" ALTER COLUMN "user_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "auidence_interests" ALTER COLUMN "demography_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "collaboration_history" ALTER COLUMN "user_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "collaboration_pref" ALTER COLUMN "user_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "media_links" ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "media_links" ADD CONSTRAINT "media_links_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collaboration_pref" ADD CONSTRAINT "collaboration_pref_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audience_demography" ADD CONSTRAINT "audience_demography_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auidence_interests" ADD CONSTRAINT "auidence_interests_demography_id_fkey" FOREIGN KEY ("demography_id") REFERENCES "audience_demography"("demograph_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collaboration_history" ADD CONSTRAINT "collaboration_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
