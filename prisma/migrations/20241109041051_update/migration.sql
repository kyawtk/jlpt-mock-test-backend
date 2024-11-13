/*
  Warnings:

  - You are about to drop the `Answer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Option` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `type` on the `Question` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `level` on the `Test` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Levels" AS ENUM ('N5', 'N4', 'N3', 'N2', 'N1');

-- CreateEnum
CREATE TYPE "QuestionTypes" AS ENUM ('vocabulary', 'grammar', 'reading', 'listening');

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_optionId_fkey";

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_questionId_fkey";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "correctOptionIndex" INTEGER,
ADD COLUMN     "options" TEXT[],
DROP COLUMN "type",
ADD COLUMN     "type" "QuestionTypes" NOT NULL;

-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "examId" INTEGER,
DROP COLUMN "level",
ADD COLUMN     "level" "Levels" NOT NULL;

-- DropTable
DROP TABLE "Answer";

-- DropTable
DROP TABLE "Option";

-- CreateTable
CREATE TABLE "Exam" (
    "id" SERIAL NOT NULL,
    "level" "Levels" NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE SET NULL ON UPDATE CASCADE;
