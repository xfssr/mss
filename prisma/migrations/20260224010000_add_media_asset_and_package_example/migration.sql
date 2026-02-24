-- CreateTable
CREATE TABLE "MediaAsset" (
    "id" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "posterUrl" TEXT,
    "width" INTEGER,
    "height" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MediaAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackageExample" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "catalogKey" TEXT,
    "tierKey" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PackageExample_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PackageExample_tierKey_catalogKey_order_idx" ON "PackageExample"("tierKey", "catalogKey", "order");

-- CreateIndex
CREATE INDEX "PackageExample_isPublished_idx" ON "PackageExample"("isPublished");

-- AddForeignKey
ALTER TABLE "PackageExample" ADD CONSTRAINT "PackageExample_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "MediaAsset"("id") ON DELETE CASCADE ON UPDATE CASCADE;
