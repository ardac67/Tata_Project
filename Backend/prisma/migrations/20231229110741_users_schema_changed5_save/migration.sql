-- CreateTable
CREATE TABLE "messages" (
    "message_id" TEXT NOT NULL,
    "collaboration_id" TEXT,
    "message_body" TEXT,
    "user_name" TEXT,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("message_id")
);
