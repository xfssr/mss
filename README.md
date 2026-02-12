# Micro-Screen Studio — HE/EN v1 (One‑page + 3D micro‑screens + Admin CMS)

Next.js (App Router) + TypeScript + Tailwind + Prisma (PostgreSQL on Neon).

## 📚 Документация

- 🇷🇺 **[Как работать с Git](КАК_РАБОТАТЬ_С_GIT.md)** - полное руководство на русском
- ⚡ **[Быстрая инструкция Git](БЫСТРАЯ_ИНСТРУКЦИЯ_GIT.md)** - краткий гайд за 5 шагов
- 🎨 **[Визуальный Git Workflow](GIT_WORKFLOW_VISUAL.md)** - схемы и диаграммы
- 🛠️ **[Настройка проекта](SETUP.md)** - установка и запуск
- 🔧 **[Решение проблем](РЕШЕНИЕ_ПРОБЛЕМ.md)** - что было исправлено

## Развертывание на Vercel с Neon Database

### 1) Создайте базу данных на Neon

1. Зарегистрируйтесь на [Neon](https://neon.tech)
2. Создайте новый проект
3. Скопируйте строку подключения (Connection String)
   - Формат: `postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require`

### 2) Настройте переменные окружения в Vercel

В настройках проекта Vercel добавьте следующие переменные:

```env
DATABASE_URL=postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
NEXT_PUBLIC_SITE_URL=https://your-site.vercel.app
NEXT_PUBLIC_WHATSAPP_PHONE=972509656366
ADMIN_PASSWORD=your-secure-password
ADMIN_COOKIE_SECRET=your-long-random-string
```

Опционально для Cloudinary:
```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_FOLDER=micro-screen-studio
```

### 3) Разверните на Vercel

1. Подключите GitHub репозиторий к Vercel
2. Vercel автоматически запустит `vercel-build` скрипт
3. База данных будет автоматически мигрирована и заполнена начальными данными

## Локальная разработка (опционально)

Если вы хотите запустить проект локально для разработки:

### 1) ENV
Создайте `.env` в корне проекта:

```env
# База данных PostgreSQL на Neon
DATABASE_URL="postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require"

# URL сайта
NEXT_PUBLIC_SITE_URL="https://studioscreen.vercel.app"

NEXT_PUBLIC_WHATSAPP_PHONE=972509656366

ADMIN_PASSWORD=change-me
ADMIN_COOKIE_SECRET="put-a-long-random-string-here"

# Optional (recommended): Cloudinary upload for images+videos
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_FOLDER=micro-screen-studio
```

### 2) Установка
```bash
npm install
```

### 3) Миграция базы данных
```bash
# Применить миграции
npx prisma migrate deploy

# Заполнить базу данных начальными данными
npx prisma db seed
```

### 4) Запуск
```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## Main page (HE/EN)
- One page: `/` (sections: `#catalog`, `#about`, `#contact`)
- Default language: **Hebrew (RTL)**.
- Switcher: **עברית / EN** (saved in `localStorage`).

## WhatsApp flow
- User picks a catalog → micro‑screen opens → examples → build package → reserve → WhatsApp prefilled.
- Fallback: **Copy text** (works on desktop without WhatsApp).

## Admin CMS
- Open: `/admin`
- Login password: `ADMIN_PASSWORD`

You can edit (HE/EN):
- Hero / About / Contact texts
- Hero slider gallery (images)
- Catalogs: titles/descriptions, **cover image**, tags, “popular”, **promo video + text**
- Examples: preview image + optional video + descriptions
- Price cards (About section): title/note/details + “More”
- Pricing config (package calculator): hours/day/week, per‑reel/per‑photo, monthly plans, SMM/targeting

## Media uploads
Admin upload supports **images + videos**:
- If Cloudinary ENV is set → uploads to Cloudinary.
- Else → uploads locally to `public/uploads`.

## Where to change content
- Catalogs/examples/prices/hero: **Admin** `/admin` (DB).
- WhatsApp phone: `.env.local` → `NEXT_PUBLIC_WHATSAPP_PHONE`.
- WhatsApp message format: `utils/whatsapp.ts`.
- Package calculator logic: `utils/packageCalculator.ts`.
