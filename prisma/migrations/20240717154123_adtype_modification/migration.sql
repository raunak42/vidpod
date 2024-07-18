/*
  Warnings:

  - The values [CUSTOM] on the enum `AdType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AdType_new" AS ENUM ('A_B', 'STATIC', 'AUTO');
ALTER TABLE "AdMarker" ALTER COLUMN "adType" TYPE "AdType_new" USING ("adType"::text::"AdType_new");
ALTER TYPE "AdType" RENAME TO "AdType_old";
ALTER TYPE "AdType_new" RENAME TO "AdType";
DROP TYPE "AdType_old";
COMMIT;
