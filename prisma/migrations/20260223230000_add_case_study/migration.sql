-- CreateTable
CREATE TABLE "CaseStudy" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "category" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleHe" TEXT NOT NULL,
    "tagsEn" TEXT NOT NULL,
    "tagsHe" TEXT NOT NULL,
    "views" TEXT NOT NULL DEFAULT '—',
    "avgWatch" TEXT NOT NULL DEFAULT '—',
    "fullWatch" TEXT NOT NULL DEFAULT '—',
    "followers" TEXT NOT NULL DEFAULT '—',
    "forYou" TEXT,
    "insightEn" TEXT NOT NULL,
    "insightHe" TEXT NOT NULL,
    "servicesEn" TEXT NOT NULL,
    "servicesHe" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CaseStudy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CaseStudy_order_idx" ON "CaseStudy"("order");

-- CreateIndex
CREATE INDEX "CaseStudy_isPublished_idx" ON "CaseStudy"("isPublished");
