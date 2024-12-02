/*
  Warnings:

  - You are about to drop the column `level` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "level",
ADD COLUMN     "Level" "Levels",
ALTER COLUMN "type" DROP NOT NULL;
