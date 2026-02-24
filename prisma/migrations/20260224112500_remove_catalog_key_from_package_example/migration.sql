-- DropIndex
DROP INDEX "PackageExample_tierKey_catalogKey_order_idx";

-- AlterTable
ALTER TABLE "PackageExample" DROP COLUMN "catalogKey";

-- CreateIndex
CREATE INDEX "PackageExample_tierKey_order_idx" ON "PackageExample"("tierKey", "order");
