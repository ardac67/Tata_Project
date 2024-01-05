-- AlterTable
ALTER TABLE "rating" ADD COLUMN     "campaign_id" TEXT;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaign"("campaign_id") ON DELETE SET NULL ON UPDATE CASCADE;
