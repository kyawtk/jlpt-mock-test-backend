/*
  Warnings:

  - A unique constraint covering the columns `[text]` on the table `Passage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Passage_text_key" ON "Passage"("text");
