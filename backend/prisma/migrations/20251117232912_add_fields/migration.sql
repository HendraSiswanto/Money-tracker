/*
  Warnings:

  - You are about to drop the column `category` on the `Transaction` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `date` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `outcome` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "category",
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "outcome" TEXT NOT NULL,
ADD COLUMN     "timestamp" BIGINT NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE INTEGER;
