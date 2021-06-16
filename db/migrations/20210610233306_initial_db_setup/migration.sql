-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('DEFAULT', 'TEST', 'ADMIN');

-- CreateEnum
CREATE TYPE "EventRole" AS ENUM ('MEMBER', 'OWNER');

-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('NO_RESPONSE', 'ACCEPTED', 'REJECTED', 'PENDING');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subscriptionLevel" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invitation" (
    "bookingId" INTEGER NOT NULL,
    "toId" TEXT NOT NULL,
    "status" "InvitationStatus" NOT NULL,

    PRIMARY KEY ("bookingId","toId")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startsAt" TIMESTAMP(3),
    "endsAt" TIMESTAMP(3),

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Booking.uuid_unique" ON "Booking"("uuid");

-- AddForeignKey
ALTER TABLE "Invitation" ADD FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD FOREIGN KEY ("toId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
