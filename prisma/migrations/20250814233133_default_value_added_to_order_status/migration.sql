/*
  Warnings:

  - You are about to drop the column `is_avaiable` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."orders" ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "public"."products" DROP COLUMN "is_avaiable",
ADD COLUMN     "is_available" BOOLEAN NOT NULL DEFAULT true;
