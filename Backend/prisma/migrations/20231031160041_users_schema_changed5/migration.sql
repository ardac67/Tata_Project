/*
  Warnings:

  - You are about to drop the column `industry` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "industry",
DROP COLUMN "location";
