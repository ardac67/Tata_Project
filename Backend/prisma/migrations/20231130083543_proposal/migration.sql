-- CreateTable
CREATE TABLE "proposal" (
    "proposal_id" TEXT NOT NULL,
    "proposal_body" TEXT,
    "proposal_status" TEXT,
    "user_id" TEXT,
    "campaign_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "proposal_pkey" PRIMARY KEY ("proposal_id")
);

-- AddForeignKey
ALTER TABLE "proposal" ADD CONSTRAINT "proposal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proposal" ADD CONSTRAINT "proposal_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaign"("campaign_id") ON DELETE SET NULL ON UPDATE CASCADE;
