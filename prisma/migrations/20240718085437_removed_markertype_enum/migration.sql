/*
  Warnings:

  - Changed the type of `markerType` on the `AdMarker` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "AdMarker" DROP COLUMN "markerType",
ADD COLUMN     "markerType" TEXT NOT NULL;

-- DropEnum
DROP TYPE "MarkerType";
