/*
  Warnings:

  - Added the required column `campaign_id` to the `review_history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "review_history" ADD COLUMN     "campaign_id" TEXT NOT NULL,
ADD COLUMN     "toAdvertiser" TEXT,
ADD COLUMN     "toUser" TEXT;

-- AddForeignKey
ALTER TABLE "review_history" ADD CONSTRAINT "review_history_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaign"("campaign_id") ON DELETE RESTRICT ON UPDATE CASCADE;
