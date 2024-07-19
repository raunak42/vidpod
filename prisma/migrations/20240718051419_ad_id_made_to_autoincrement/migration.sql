-- AlterTable
CREATE SEQUENCE ad_id_seq;
ALTER TABLE "Ad" ALTER COLUMN "id" SET DEFAULT nextval('ad_id_seq');
ALTER SEQUENCE ad_id_seq OWNED BY "Ad"."id";
