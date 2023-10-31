-- CreateTable
CREATE TABLE "audience_demography" (
    "demograph_id" TEXT NOT NULL,
    "age_interval" TEXT,
    "gender_information" TEXT,
    "location" TEXT,
    "so_status" TEXT,
    "user_id" TEXT,

    CONSTRAINT "audience_demography_pkey" PRIMARY KEY ("demograph_id")
);

-- AddForeignKey
ALTER TABLE "audience_demography" ADD CONSTRAINT "audience_demography_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
