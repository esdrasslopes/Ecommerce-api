/*
  Warnings:

  - The values [CASUAL,SPORT,RUNNING,WALKING,SKATE,RETRO,PLATFORM] on the enum `CategoryName` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `author` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publisher` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."CategoryName_new" AS ENUM ('FICTION', 'NONFICTION', 'FANTASY', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'SCIFI', 'MYSTERY', 'THRILLER', 'ROMANCE', 'CHILDREN', 'YOUNG_ADULT', 'SELF_HELP', 'POETRY', 'CLASSICS', 'COOKING');
ALTER TABLE "public"."categories" ALTER COLUMN "name" TYPE "public"."CategoryName_new" USING ("name"::text::"public"."CategoryName_new");
ALTER TYPE "public"."CategoryName" RENAME TO "CategoryName_old";
ALTER TYPE "public"."CategoryName_new" RENAME TO "CategoryName";
DROP TYPE "public"."CategoryName_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."products" ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "publisher" TEXT NOT NULL;
