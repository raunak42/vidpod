/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AdType" AS ENUM ('A_B', 'STATIC', 'CUSTOM');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "AdMarker" (
    "id" SERIAL NOT NULL,
    "adStart" INTEGER NOT NULL,
    "adLength" INTEGER NOT NULL,
    "adType" "AdType" NOT NULL,
    "adUrl" TEXT NOT NULL,

    CONSTRAINT "AdMarker_pkey" PRIMARY KEY ("id")
);
