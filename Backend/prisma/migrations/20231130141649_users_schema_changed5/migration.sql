-- CreateTable
CREATE TABLE "collaboration" (
    "collaboration_id" TEXT NOT NULL,
    "campaign_id" TEXT,
    "user_id" TEXT,
    "proposed_user_id" TEXT,
    "status" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "collaboration_pkey" PRIMARY KEY ("collaboration_id")
);

-- AddForeignKey
ALTER TABLE "collaboration" ADD CONSTRAINT "collaboration_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaign"("campaign_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collaboration" ADD CONSTRAINT "collaboration_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
