import type { Catalog } from "@/types/catalog";

export const CATALOGS: Catalog[] = [
  {
    slug: "bars",
    title: {
      en: "Bars",
      he: "מסעדות/ברים",
    },
    shortDescription: {
      en: "Атмосфера, свет, коктейли — кадры, которые продают настроение.",
      he: ""
    },
    longDescription:
      {
        en: "Съёмка баров и коктейльной культуры: интерьер, детали, люди в кадре, короткие клипы для Reels.\nПодходит для обновления меню, запусков и промо-ивентов.",
        he: ""
      },
    tags: ["Night", "Cocktails", "Reels"],
    examples: Array.from({ length: 9 }).map((_, i) => ({
      id: i,
      order: i,
      title: { en: `Bar shot ${i + 1}`, he: "" },
      description: { en: "", he: "" },
      mediaType: "IMAGE" as const,
      mediaUrl: `https://picsum.photos/seed/bars-${i + 1}/960/640`,
    })),
  },
  {
    slug: "restaurants",
    title: {
      en: "Restaurants",
      he: ""
    },
    popular: true,
    shortDescription: {
      en: "Еда, подача и сервис — чистый визуал без лишнего шума.",
      he: ""
    },
    longDescription:
      {
        en: "Контент для ресторанов: блюда, процесс, интерьер, портреты шефа и команды.\nСтавка на аккуратный свет, текстуры и понятный сторителлинг.",
        he: ""
      },
    tags: ["Food", "Menu", "Brand"],
    examples: Array.from({ length: 9 }).map((_, i) => ({
      id: i,
      order: i,
      title: { en: `Restaurant frame ${i + 1}`, he: "" },
      description: { en: "", he: "" },
      mediaType: "IMAGE" as const,
      mediaUrl: `https://picsum.photos/seed/restaurants-${i + 1}/960/640`,
    })),
  },
  {
    slug: "hotels",
    title: {
      en: "Hotels",
      he: ""
    },
    shortDescription: {
      en: "Номера, лобби, детали сервиса — премиальный, спокойный тон.",
      he: ""
    },
    longDescription:
      {
        en: "Съёмка отелей и апартов: номера, общие зоны, детали, утро/вечер.\nПодходит для сайта, OTA карточек и бренд-коммуникаций.",
        he: ""
      },
    tags: ["Hospitality", "Interior", "Premium"],
    examples: Array.from({ length: 9 }).map((_, i) => ({
      id: i,
      order: i,
      title: { en: `Hotel scene ${i + 1}`, he: "" },
      description: { en: "", he: "" },
      mediaType: "IMAGE" as const,
      mediaUrl: `https://picsum.photos/seed/hotels-${i + 1}/960/640`,
    })),
  },
  {
    slug: "events",
    title: {
      en: "Events",
      he: ""
    },
    shortDescription: {
      en: "Репортаж + хайлайты — динамика без хаоса.",
      he: ""
    },
    longDescription:
      {
        en: "Съёмка мероприятий: репортаж, бренд-зоны, спикеры, эмоции, aftermovie-подход.\nФорматы: фото + короткие вертикальные видео.",
        he: ""
      },
    tags: ["Report", "Highlights", "People"],
    examples: Array.from({ length: 9 }).map((_, i) => ({
      id: i,
      order: i,
      title: { en: `Event moment ${i + 1}`, he: "" },
      description: { en: "", he: "" },
      mediaType: "IMAGE" as const,
      mediaUrl: `https://picsum.photos/seed/events-${i + 1}/960/640`,
    })),
  },
  {
    slug: "real-estate",
    title: {
      en: "Real Estate",
      he: ""
    },
    popular: true,
    shortDescription: {
      en: "Чистая геометрия, пространство и свет — продающее представление.",
      he: ""
    },
    longDescription:
      {
        en: "Съёмка недвижимости: квартиры, виллы, коммерция.\nСтавка на перспективу, натуральный свет и понятную серию кадров.",
        he: ""
      },
    tags: ["Property", "Wide", "Listing"],
    examples: Array.from({ length: 9 }).map((_, i) => ({
      id: i,
      order: i,
      title: { en: `Estate view ${i + 1}`, he: "" },
      description: { en: "", he: "" },
      mediaType: "IMAGE" as const,
      mediaUrl: `https://picsum.photos/seed/estate-${i + 1}/960/640`,
    })),
  },
];
