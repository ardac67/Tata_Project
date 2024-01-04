-- CreateTable
CREATE TABLE "rating" (
    "rating_id" TEXT NOT NULL,
    "rating" INTEGER,
    "user_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rating_pkey" PRIMARY KEY ("rating_id")
);
