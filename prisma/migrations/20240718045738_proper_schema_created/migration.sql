/*
  Warnings:

  - You are about to drop the column `adLength` on the `AdMarker` table. All the data in the column will be lost.
  - You are about to drop the column `adStart` on the `AdMarker` table. All the data in the column will be lost.
  - You are about to drop the column `adType` on the `AdMarker` table. All the data in the column will be lost.
  - You are about to drop the column `adUrl` on the `AdMarker` table. All the data in the column will be lost.
  - Added the required column `markerStart` to the `AdMarker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `markerType` to the `AdMarker` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MarkerType" AS ENUM ('A/B test', 'Static', 'Custom');

-- AlterTable
ALTER TABLE "AdMarker" DROP COLUMN "adLength",
DROP COLUMN "adStart",
DROP COLUMN "adType",
DROP COLUMN "adUrl",
ADD COLUMN     "markerStart" INTEGER NOT NULL,
ADD COLUMN     "markerType" "MarkerType" NOT NULL;

-- DropEnum
DROP TYPE "AdType";

-- CreateTable
CREATE TABLE "Ad" (
    "id" INTEGER NOT NULL,
    "length" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "publishedDate" TEXT NOT NULL,

    CONSTRAINT "Ad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AdToAdMarker" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Ad_id_key" ON "Ad"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_AdToAdMarker_AB_unique" ON "_AdToAdMarker"("A", "B");

-- CreateIndex
CREATE INDEX "_AdToAdMarker_B_index" ON "_AdToAdMarker"("B");

-- AddForeignKey
ALTER TABLE "_AdToAdMarker" ADD CONSTRAINT "_AdToAdMarker_A_fkey" FOREIGN KEY ("A") REFERENCES "Ad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdToAdMarker" ADD CONSTRAINT "_AdToAdMarker_B_fkey" FOREIGN KEY ("B") REFERENCES "AdMarker"("id") ON DELETE CASCADE ON UPDATE CASCADE;
