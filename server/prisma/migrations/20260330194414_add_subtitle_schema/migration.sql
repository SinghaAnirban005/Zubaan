-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('PENDING', 'DONE', 'FAILED');

-- CreateTable
CREATE TABLE "Subtitle" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "srtData" TEXT NOT NULL,
    "status" "JobStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subtitle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subtitle_id_key" ON "Subtitle"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Subtitle_userId_key" ON "Subtitle"("userId");

-- CreateIndex
CREATE INDEX "Subtitle_userId_idx" ON "Subtitle"("userId");

-- AddForeignKey
ALTER TABLE "Subtitle" ADD CONSTRAINT "Subtitle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
