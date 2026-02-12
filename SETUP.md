# Руководство по настройке и запуску проекта

## Важно: Проект настроен для работы с PostgreSQL (Neon) и Vercel

Этот проект использует PostgreSQL базу данных через Neon и предназначен для развертывания на Vercel.

## Развертывание на Vercel (рекомендуется)

### 1. Настройка базы данных на Neon

1. Зарегистрируйтесь на [https://neon.tech](https://neon.tech)
2. Создайте новый проект
3. В разделе "Connection Details" скопируйте строку подключения:
   - Выберите "Pooled connection" для лучшей производительности с Vercel
   - Формат: `postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require`

### 2. Настройка проекта на Vercel

1. Зайдите на [https://vercel.com](https://vercel.com)
2. Импортируйте ваш GitHub репозиторий
3. В настройках проекта добавьте переменные окружения:

**Обязательные переменные:**
```
DATABASE_URL=postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_WHATSAPP_PHONE=972509656366
ADMIN_PASSWORD=ваш-безопасный-пароль
ADMIN_COOKIE_SECRET=длинная-случайная-строка-минимум-32-символа
```

**Опциональные переменные (для Cloudinary):**
```
CLOUDINARY_CLOUD_NAME=ваше-облако
CLOUDINARY_API_KEY=ваш-ключ
CLOUDINARY_API_SECRET=ваш-секрет
CLOUDINARY_FOLDER=micro-screen-studio
```

### 3. Развертывание

1. Нажмите "Deploy"
2. Vercel автоматически:
   - Установит зависимости
   - Сгенерирует Prisma Client
   - Соберет Next.js приложение
   - Применит миграции базы данных
   - Заполнит базу данных начальными данными (seed)

### 4. После развертывания

1. Откройте ваш сайт по адресу `https://your-domain.vercel.app`
2. Зайдите в админ-панель: `https://your-domain.vercel.app/admin`
3. Используйте пароль из `ADMIN_PASSWORD`

## Локальная разработка (опционально)

Если вы хотите разрабатывать локально, но все равно использовать Neon базу данных:

### 1. Создайте .env файл

Скопируйте `.env.example` в `.env`:
```bash
cp .env.example .env
```

Заполните переменные:
```env
DATABASE_URL="postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_WHATSAPP_PHONE="972509656366"
ADMIN_PASSWORD="ваш-пароль"
ADMIN_COOKIE_SECRET="длинная-случайная-строка"
```

### 2. Установите зависимости

```bash
npm install
```

### 3. Примените миграции

```bash
npx prisma migrate deploy
```

### 4. Заполните базу данных (первый раз)

```bash
npx prisma db seed
```

### 5. Запустите dev сервер

```bash
npm run dev
```

Приложение будет доступно по адресу http://localhost:3000

## Проблемы, которые были исправлены

### 1. База данных
**Было**: Схема Prisma была настроена на SQLite для локальной разработки.

**Стало**: 
- Изменен провайдер с SQLite на PostgreSQL в `prisma/schema.prisma`
- Обновлены миграции для синтаксиса PostgreSQL
- Обновлен `migration_lock.toml` для указания PostgreSQL
- Настроена работа с Neon (serverless PostgreSQL)

### 2. Переменные окружения
**Было**: Примеры переменных окружения были для SQLite.

**Стало**:
- Обновлен `.env.example` с примером подключения к Neon
- Добавлены инструкции для настройки на Vercel

### 3. Документация
**Было**: Инструкции были только для локальной разработки с SQLite.

**Стало**:
- Добавлены подробные инструкции для Vercel + Neon
- Обновлены README.md и SETUP.md
- Локальная разработка теперь опциональна

## Структура базы данных

Основные таблицы:
- `SiteSettings` - настройки сайта (заголовки, тексты)
- `PricingConfig` - конфигурация цен
- `HeroMedia` - изображения для героя главной страницы
- `PriceItem` - элементы прайс-листа
- `Catalog` - каталоги услуг
- `Example` - примеры работ для каждого каталога

## Полезные команды Prisma

### Посмотреть схему базы данных
```bash
npx prisma studio
```

### Создать новую миграцию (только для разработки)
```bash
npx prisma migrate dev --name описание_изменений
```

### Применить миграции на продакшене
```bash
npx prisma migrate deploy
```

### Заполнить базу данных начальными данными
```bash
npx prisma db seed
```

### Сгенерировать Prisma Client
```bash
npx prisma generate
```

## Часто задаваемые вопросы

### Как обновить данные на сайте?

1. Зайдите в админ-панель: `https://your-site.vercel.app/admin`
2. Используйте графический интерфейс для редактирования

### Как добавить новый каталог?

Через админ-панель в разделе "Catalogs"

### Где хранятся изображения?

- Если настроен Cloudinary - на Cloudinary
- Иначе - в папке `public/uploads` (не рекомендуется для Vercel)

### Можно ли использовать другую БД вместо Neon?

Да, можно использовать любой PostgreSQL провайдер:
- Supabase
- Railway
- Render
- Или свой собственный сервер PostgreSQL

Просто измените `DATABASE_URL` на строку подключения вашей БД.
