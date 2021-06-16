/*
  Warnings:

  - You are about to drop the column `antiCRSFToken` on the `Session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "antiCRSFToken",
ADD COLUMN     "antiCSRFToken" TEXT;
