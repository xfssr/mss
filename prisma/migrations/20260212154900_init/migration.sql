-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "heroTitleHe" TEXT NOT NULL DEFAULT 'תוכן שמרגיש יוקרתי. מינימליסטי. מדויק.',
    "heroTitleEn" TEXT NOT NULL DEFAULT 'Minimal content that looks premium.',
    "heroSubtitleHe" TEXT NOT NULL DEFAULT 'בחרו קטגוריה → בחרו חבילה → מלאו תאריך/עיר → ההודעה ל-WhatsApp מוכנה.',
    "heroSubtitleEn" TEXT NOT NULL DEFAULT 'Pick a category → choose a package → add date/city → WhatsApp message is ready.',
    "promoTextHe" TEXT NOT NULL DEFAULT 'אני יוצר תוכן ל-Hospitality ו-Real Estate — צילום נקי, תאורה רכה, תוצאה שמוכרת.',
    "promoTextEn" TEXT NOT NULL DEFAULT 'I create content for hospitality & real estate — clean light, premium feel, sales-ready.',
    "aboutTextHe" TEXT NOT NULL DEFAULT 'סגנון נקי ומדויק: קומפוזיציה, תאורה, תנועה עדינה. מינימום רעש — מקסימום ‘יוקרתי’.',
    "aboutTextEn" TEXT NOT NULL DEFAULT 'Clean, precise visual style: composition, light, subtle motion. Less noise — more premium.',
    "contactTextHe" TEXT NOT NULL DEFAULT 'הכי מהר ב-WhatsApp. לרוב עונה תוך 1–3 שעות.',
    "contactTextEn" TEXT NOT NULL DEFAULT 'Fastest via WhatsApp. Usually reply within 1–3 hours.',
    "instagramHandle" TEXT NOT NULL DEFAULT '@emil_edition',
    "email" TEXT NOT NULL DEFAULT 'nisenem98@gmail.com',
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PricingConfig" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "currency" TEXT NOT NULL DEFAULT '$',
    "duration2h" INTEGER NOT NULL DEFAULT 220,
    "duration4h" INTEGER NOT NULL DEFAULT 380,
    "duration8h" INTEGER NOT NULL DEFAULT 650,
    "durationDay" INTEGER NOT NULL DEFAULT 850,
    "durationWeek" INTEGER NOT NULL DEFAULT 2600,
    "perReel" INTEGER NOT NULL DEFAULT 80,
    "perPhoto" INTEGER NOT NULL DEFAULT 10,
    "monthlyStarter" INTEGER NOT NULL DEFAULT 2400,
    "monthlyGrowth" INTEGER NOT NULL DEFAULT 3600,
    "monthlyPro" INTEGER NOT NULL DEFAULT 5200,
    "socialManagement" INTEGER NOT NULL DEFAULT 900,
    "targetingSetup" INTEGER NOT NULL DEFAULT 300,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "HeroMedia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imageUrl" TEXT NOT NULL,
    "titleHe" TEXT NOT NULL DEFAULT '',
    "titleEn" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PriceItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titleHe" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "noteHe" TEXT NOT NULL DEFAULT '',
    "noteEn" TEXT NOT NULL DEFAULT '',
    "detailsHe" TEXT NOT NULL DEFAULT '',
    "detailsEn" TEXT NOT NULL DEFAULT '',
    "order" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Catalog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "titleHe" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "shortDescriptionHe" TEXT NOT NULL,
    "shortDescriptionEn" TEXT NOT NULL,
    "longDescriptionHe" TEXT NOT NULL,
    "longDescriptionEn" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL DEFAULT '',
    "promoVideoUrl" TEXT NOT NULL DEFAULT '',
    "promoVideoTitleHe" TEXT NOT NULL DEFAULT '',
    "promoVideoTitleEn" TEXT NOT NULL DEFAULT '',
    "promoVideoDescriptionHe" TEXT NOT NULL DEFAULT '',
    "promoVideoDescriptionEn" TEXT NOT NULL DEFAULT '',
    "tagsJson" TEXT NOT NULL DEFAULT '[]',
    "popular" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Example" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "catalogId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "titleHe" TEXT NOT NULL DEFAULT '',
    "titleEn" TEXT NOT NULL DEFAULT '',
    "descriptionHe" TEXT NOT NULL DEFAULT '',
    "descriptionEn" TEXT NOT NULL DEFAULT '',
    "mediaType" TEXT NOT NULL DEFAULT 'IMAGE',
    "mediaUrl" TEXT NOT NULL,
    "posterUrl" TEXT,
    "link" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Example_catalogId_fkey" FOREIGN KEY ("catalogId") REFERENCES "Catalog" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Catalog_slug_key" ON "Catalog"("slug");

-- CreateIndex
CREATE INDEX "Example_catalogId_idx" ON "Example"("catalogId");
