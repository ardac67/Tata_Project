-- CreateTable
CREATE TABLE "campaign" (
    "campaign_id" TEXT NOT NULL,
    "campaign_description" TEXT,
    "campaign_header" TEXT,
    "user_id" TEXT,
    "status" TEXT,
    "startedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "campaign_pkey" PRIMARY KEY ("campaign_id")
);

-- CreateTable
CREATE TABLE "collaboration_preferences" (
    "preference_id" TEXT NOT NULL,
    "target_audience" TEXT,
    "campaign_id" TEXT,
    "age_interval" TEXT,
    "gender_information" TEXT,
    "statistical_interval" TEXT,

    CONSTRAINT "collaboration_preferences_pkey" PRIMARY KEY ("preference_id")
);

-- CreateTable
CREATE TABLE "preffered_platforms" (
    "platform_id" TEXT NOT NULL,
    "platform" TEXT,
    "preference_id" TEXT,

    CONSTRAINT "preffered_platforms_pkey" PRIMARY KEY ("platform_id")
);

-- CreateTable
CREATE TABLE "campaing_tags" (
    "tag_id" TEXT NOT NULL,
    "description" TEXT,
    "campaign_id" TEXT,

    CONSTRAINT "campaing_tags_pkey" PRIMARY KEY ("tag_id")
);

-- AddForeignKey
ALTER TABLE "campaign" ADD CONSTRAINT "campaign_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collaboration_preferences" ADD CONSTRAINT "collaboration_preferences_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaign"("campaign_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preffered_platforms" ADD CONSTRAINT "preffered_platforms_preference_id_fkey" FOREIGN KEY ("preference_id") REFERENCES "collaboration_preferences"("preference_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaing_tags" ADD CONSTRAINT "campaing_tags_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaign"("campaign_id") ON DELETE SET NULL ON UPDATE CASCADE;
