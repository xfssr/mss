# Micro-Screen Studio — HE/EN v1 (One‑page + 3D micro‑screens + Admin CMS)

Next.js (App Router) + TypeScript + Tailwind + Prisma (PostgreSQL).

## 1) ENV
Create `.env.local` in project root:

```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

NEXT_PUBLIC_WHATSAPP_PHONE=972509656366

ADMIN_PASSWORD=change-me
ADMIN_COOKIE_SECRET="put-a-long-random-string-here"

# Optional (recommended): Cloudinary upload for images+videos
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_FOLDER=micro-screen-studio
```

## 2) Install + DB
```bash
npm install
npx prisma migrate dev --name init
npx prisma db seed
```

## 3) Run
```bash
npm run dev
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
