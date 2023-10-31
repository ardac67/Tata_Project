-- AlterTable
ALTER TABLE "audience_demography" ALTER COLUMN "age_interval" DROP NOT NULL,
ALTER COLUMN "gender_information" DROP NOT NULL;

-- AlterTable
ALTER TABLE "auidence_interests" ALTER COLUMN "Description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "collaboration_history" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "outcomes" DROP NOT NULL;

-- AlterTable
ALTER TABLE "collaboration_pref" ALTER COLUMN "reason" DROP NOT NULL;

-- AlterTable
ALTER TABLE "contact" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "media_links" ALTER COLUMN "platform" DROP NOT NULL,
ALTER COLUMN "link" DROP NOT NULL,
ALTER COLUMN "subscribers" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);
