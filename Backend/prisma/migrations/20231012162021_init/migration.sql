-- CreateTable
CREATE TABLE "advertiser" (
    "advertiser_id" TEXT NOT NULL,
    "user_name" VARCHAR(50) NOT NULL,
    "password" TEXT NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "industry" VARCHAR(500) NOT NULL,
    "location" VARCHAR(500) NOT NULL,

    CONSTRAINT "advertiser_pkey" PRIMARY KEY ("advertiser_id")
);

-- CreateTable
CREATE TABLE "contact" (
    "contact_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" VARCHAR(20),
    "address" VARCHAR(1000),
    "advertiser_user_id" TEXT NOT NULL,
    "influencer_user_id" TEXT NOT NULL,

    CONSTRAINT "contact_pkey" PRIMARY KEY ("contact_id")
);

-- CreateTable
CREATE TABLE "influencer" (
    "influencer_id" TEXT NOT NULL,

    CONSTRAINT "influencer_pkey" PRIMARY KEY ("influencer_id")
);

-- CreateTable
CREATE TABLE "media_links" (
    "media_id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "advertiser_user_id" TEXT NOT NULL,
    "influencer_user_id" TEXT NOT NULL,

    CONSTRAINT "media_links_pkey" PRIMARY KEY ("media_id")
);

-- CreateTable
CREATE TABLE "collaboration_pref" (
    "pref_id" TEXT NOT NULL,
    "reason" VARCHAR(800) NOT NULL,
    "advertiser_user_id" TEXT NOT NULL,
    "influencer_user_id" TEXT NOT NULL,

    CONSTRAINT "collaboration_pref_pkey" PRIMARY KEY ("pref_id")
);

-- CreateTable
CREATE TABLE "campaign_details" (
    "campaign_id" TEXT NOT NULL,
    "goals" TEXT,
    "assets" VARCHAR(200) NOT NULL,
    "key_messages" VARCHAR(1000) NOT NULL,

    CONSTRAINT "campaign_details_pkey" PRIMARY KEY ("campaign_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contact_advertiser_user_id_key" ON "contact"("advertiser_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "contact_influencer_user_id_key" ON "contact"("influencer_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "media_links_advertiser_user_id_key" ON "media_links"("advertiser_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "media_links_influencer_user_id_key" ON "media_links"("influencer_user_id");

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_advertiser_user_id_fkey" FOREIGN KEY ("advertiser_user_id") REFERENCES "advertiser"("advertiser_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact" ADD CONSTRAINT "contact_influencer_user_id_fkey" FOREIGN KEY ("influencer_user_id") REFERENCES "influencer"("influencer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_links" ADD CONSTRAINT "media_links_advertiser_user_id_fkey" FOREIGN KEY ("advertiser_user_id") REFERENCES "advertiser"("advertiser_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_links" ADD CONSTRAINT "media_links_influencer_user_id_fkey" FOREIGN KEY ("influencer_user_id") REFERENCES "influencer"("influencer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collaboration_pref" ADD CONSTRAINT "collaboration_pref_advertiser_user_id_fkey" FOREIGN KEY ("advertiser_user_id") REFERENCES "advertiser"("advertiser_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collaboration_pref" ADD CONSTRAINT "collaboration_pref_influencer_user_id_fkey" FOREIGN KEY ("influencer_user_id") REFERENCES "influencer"("influencer_id") ON DELETE RESTRICT ON UPDATE CASCADE;
