-- CreateEnum
CREATE TYPE "NotificationSource" AS ENUM ('SYSTEM', 'INVITATION');

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "source" "NotificationSource" NOT NULL DEFAULT E'SYSTEM',
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
