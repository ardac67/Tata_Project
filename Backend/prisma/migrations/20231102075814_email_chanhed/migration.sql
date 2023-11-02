/*
  Warnings:

  - You are about to drop the column `email` on the `contact` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "contact" DROP COLUMN "email";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "email" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "description" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
