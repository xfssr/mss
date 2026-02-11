import { prisma } from "@/lib/prisma";
import { adminLogout } from "./login/actions";
import {
  createCatalog,
  createExample,
  createHeroMedia,
  createPriceItem,
  deleteCatalog,
  deleteExample,
  deleteHeroMedia,
  deletePriceItem,
  updateCatalog,
  updateExample,
  updateHeroMedia,
  updatePriceItem,
  updatePricingConfig,
  updateSettings,
} from "./actions";
import { UploadUrlInput } from "@/components/admin/UploadUrlInput";

function tagsToCsv(tagsJson: string) {
  try {
    const v = JSON.parse(tagsJson);
    return Array.isArray(v) ? v.join(", ") : "";
  } catch {
    return "";
  }
}

export default async function AdminPage() {
  const settings = await prisma.siteSettings.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } });
  const pricing = await prisma.pricingConfig.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } });

  const hero = await prisma.heroMedia.findMany({ orderBy: [{ order: "asc" }, { id: "asc" }] });
  const priceItems = await prisma.priceItem.findMany({ orderBy: [{ order: "asc" }, { id: "asc" }] });

  const catalogs = await prisma.catalog.findMany({
    include: { examples: true },
    orderBy: [{ popular: "desc" }, { titleEn: "asc" }],
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f14] via-[#0a0c10] to-[#06070a] text-white" dir="ltr">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/25 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="font-medium">Admin</div>
          <form action={adminLogout}>
            <button className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm hover:bg-white/[0.10]">Logout</button>
          </form>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <section className="cc-glass rounded-3xl p-6">
          <h2 className="text-xl font-semibold text-[rgb(var(--blue))]">Site settings (HE/EN)</h2>

          <form action={updateSettings} className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="text-sm font-medium text-white/90">Hebrew</div>
              <label className="block">
                <span className="text-[11px] text-white/55">Hero title (HE)</span>
                <input name="heroTitleHe" defaultValue={settings.heroTitleHe} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
              </label>
              <label className="block">
                <span className="text-[11px] text-white/55">Hero subtitle (HE)</span>
                <textarea name="heroSubtitleHe" defaultValue={settings.heroSubtitleHe} rows={3} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none resize-none" />
              </label>
              <label className="block">
                <span className="text-[11px] text-white/55">Promo text (HE)</span>
                <textarea name="promoTextHe" defaultValue={settings.promoTextHe} rows={3} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none resize-none" />
              </label>
              <label className="block">
                <span className="text-[11px] text-white/55">About text (HE)</span>
                <textarea name="aboutTextHe" defaultValue={settings.aboutTextHe} rows={4} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none resize-none" />
              </label>
              <label className="block">
                <span className="text-[11px] text-white/55">Contact text (HE)</span>
                <textarea name="contactTextHe" defaultValue={settings.contactTextHe} rows={3} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none resize-none" />
              </label>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-medium text-white/90">English</div>
              <label className="block">
                <span className="text-[11px] text-white/55">Hero title (EN)</span>
                <input name="heroTitleEn" defaultValue={settings.heroTitleEn} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
              </label>
              <label className="block">
                <span className="text-[11px] text-white/55">Hero subtitle (EN)</span>
                <textarea name="heroSubtitleEn" defaultValue={settings.heroSubtitleEn} rows={3} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none resize-none" />
              </label>
              <label className="block">
                <span className="text-[11px] text-white/55">Promo text (EN)</span>
                <textarea name="promoTextEn" defaultValue={settings.promoTextEn} rows={3} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none resize-none" />
              </label>
              <label className="block">
                <span className="text-[11px] text-white/55">About text (EN)</span>
                <textarea name="aboutTextEn" defaultValue={settings.aboutTextEn} rows={4} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none resize-none" />
              </label>
              <label className="block">
                <span className="text-[11px] text-white/55">Contact text (EN)</span>
                <textarea name="contactTextEn" defaultValue={settings.contactTextEn} rows={3} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none resize-none" />
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <label className="block">
                  <span className="text-[11px] text-white/55">Instagram</span>
                  <input name="instagramHandle" defaultValue={settings.instagramHandle} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
                </label>
                <label className="block">
                  <span className="text-[11px] text-white/55">Email</span>
                  <input name="email" defaultValue={settings.email} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
                </label>
              </div>

              <button className="mt-2 w-full rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/20 px-4 py-3 text-sm text-white hover:bg-[rgb(var(--red))]/30">
                Save settings
              </button>
            </div>
          </form>
        </section>

        <section className="cc-glass rounded-3xl p-6">
          <h2 className="text-xl font-semibold text-[rgb(var(--blue))]">Pricing config (calculator)</h2>

          <form action={updatePricingConfig} className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <label className="block">
              <span className="text-[11px] text-white/55">Currency</span>
              <input name="currency" defaultValue={pricing.currency} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
            </label>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block">
                <span className="text-[11px] text-white/55">Duration 2h</span>
                <input name="duration2h" type="number" defaultValue={pricing.duration2h} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
              </label>
              <label className="block">
                <span className="text-[11px] text-white/55">Duration 4h</span>
                <input name="duration4h" type="number" defaultValue={pricing.duration4h} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
              </label>
              <label className="block">
                <span className="text-[11px] text-white/55">Duration 8h</span>
                <input name="duration8h" type="number" defaultValue={pricing.duration8h} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
              </label>
              <label className="block">
                <span className="text-[11px] text-white/55">Duration Day</span>
                <input name="durationDay" type="number" defaultValue={pricing.durationDay} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
              </label>
              <label className="block">
                <span className="text-[11px] text-white/55">Duration Week</span>
                <input name="durationWeek" type="number" defaultValue={pricing.durationWeek} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
              </label>
              <label className="block">
                <span className="text-[11px] text-white/55">Per Reel</span>
                <input name="perReel" type="number" defaultValue={pricing.perReel} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
              </label>
              <label className="block">
                <span className="text-[11px] text-white/55">Per Photo</span>
                <input name="perPhoto" type="number" defaultValue={pricing.perPhoto} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
              </label>

              <label className="block">
                <span className="text-[11px] text-white/55">Monthly Starter</span>
                <input name="monthlyStarter" type="number" defaultValue={pricing.monthlyStarter} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
              </label>
              <label className="block">
                <span className="text-[11px] text-white/55">Monthly Growth</span>
                <input name="monthlyGrowth" type="number" defaultValue={pricing.monthlyGrowth} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
              </label>
              <label className="block">
                <span className="text-[11px] text-white/55">Monthly Pro</span>
                <input name="monthlyPro" type="number" defaultValue={pricing.monthlyPro} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
              </label>

              <label className="block">
                <span className="text-[11px] text-white/55">Social management</span>
                <input name="socialManagement" type="number" defaultValue={pricing.socialManagement} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
              </label>
              <label className="block">
                <span className="text-[11px] text-white/55">Targeting setup</span>
                <input name="targetingSetup" type="number" defaultValue={pricing.targetingSetup} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
              </label>
            </div>

            <button className="lg:col-span-3 mt-2 rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/20 px-4 py-3 text-sm text-white hover:bg-[rgb(var(--red))]/30">
              Save pricing config
            </button>
          </form>
        </section>

        <section className="cc-glass rounded-3xl p-6">
          <h2 className="text-xl font-semibold text-[rgb(var(--blue))]">Hero gallery (slider)</h2>

          <div className="mt-6 space-y-4">
            {hero.map((h) => (
  <div key={h.id} className="rounded-3xl border border-white/10 bg-black/20 p-5">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <form action={updateHeroMedia.bind(null, h.id)} className="contents">
        <UploadUrlInput name="imageUrl" defaultValue={h.imageUrl} label="Image URL" accept="image/*" preview="image" />
        <div className="space-y-3">
          <label className="block">
            <span className="text-[11px] text-white/55">Title HE</span>
            <input name="titleHe" defaultValue={h.titleHe} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
          </label>
          <label className="block">
            <span className="text-[11px] text-white/55">Title EN</span>
            <input name="titleEn" defaultValue={h.titleEn} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
          </label>
          <label className="block">
            <span className="text-[11px] text-white/55">Order</span>
            <input name="order" type="number" defaultValue={h.order} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
          </label>

          <button className="w-full rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/20 px-4 py-3 text-sm text-white hover:bg-[rgb(var(--red))]/30">
            Save
          </button>
        </div>
      </form>

      <div className="lg:col-start-3 lg:row-start-1 lg:row-span-1 flex lg:justify-end">
        <form action={deleteHeroMedia.bind(null, h.id)}>
          <button className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/85 hover:bg-white/[0.10]">
            Delete
          </button>
        </form>
      </div>
    </div>
  </div>
))}

          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-black/20 p-5">
            <div className="text-sm font-medium text-white/90">Add hero slide</div>
            <form action={createHeroMedia} className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
              <UploadUrlInput name="imageUrl" defaultValue="" label="Image URL" accept="image/*" preview="image" />
              <div className="space-y-3">
                <label className="block">
                  <span className="text-[11px] text-white/55">Title HE</span>
                  <input name="titleHe" defaultValue="" className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
                </label>
                <label className="block">
                  <span className="text-[11px] text-white/55">Title EN</span>
                  <input name="titleEn" defaultValue="" className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
                </label>
                <label className="block">
                  <span className="text-[11px] text-white/55">Order</span>
                  <input name="order" type="number" defaultValue={0} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
                </label>

                <button className="w-full rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/20 px-4 py-3 text-sm text-white hover:bg-[rgb(var(--red))]/30">
                  Create hero slide
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className="cc-glass rounded-3xl p-6">
          <h2 className="text-xl font-semibold text-[rgb(var(--blue))]">Price list cards (About section)</h2>

          <div className="mt-6 space-y-4">
            {priceItems.map((p) => (
  <div key={p.id} className="rounded-3xl border border-white/10 bg-black/20 p-5">
    <div className="flex items-start justify-between gap-3">
      <div className="text-sm text-white/55">id: <span className="font-mono">{p.id}</span></div>
      <form action={deletePriceItem.bind(null, p.id)}>
        <button className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/85 hover:bg-white/[0.10]">Delete</button>
      </form>
    </div>

    <form action={updatePriceItem.bind(null, p.id)} className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="space-y-3">
        <label className="block">
          <span className="text-[11px] text-white/55">Title HE</span>
          <input name="titleHe" defaultValue={p.titleHe} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
        </label>
        <label className="block">
          <span className="text-[11px] text-white/55">Title EN</span>
          <input name="titleEn" defaultValue={p.titleEn} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
        </label>
        <label className="block">
          <span className="text-[11px] text-white/55">Price label</span>
          <input name="price" defaultValue={p.price} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
        </label>
        <label className="block">
          <span className="text-[11px] text-white/55">Note HE</span>
          <input name="noteHe" defaultValue={p.noteHe} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
        </label>
        <label className="block">
          <span className="text-[11px] text-white/55">Note EN</span>
          <input name="noteEn" defaultValue={p.noteEn} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
        </label>
      </div>

      <div className="space-y-3">
        <label className="block">
          <span className="text-[11px] text-white/55">Details HE (multiline)</span>
          <textarea name="detailsHe" defaultValue={p.detailsHe} rows={6} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none resize-none" />
        </label>
        <label className="block">
          <span className="text-[11px] text-white/55">Details EN (multiline)</span>
          <textarea name="detailsEn" defaultValue={p.detailsEn} rows={6} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none resize-none" />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-[11px] text-white/55">Order</span>
            <input name="order" type="number" defaultValue={p.order} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
          </label>
          <div className="flex items-end">
            <button className="w-full rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/20 px-4 py-3 text-sm text-white hover:bg-[rgb(var(--red))]/30">
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
))}

          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-black/20 p-5">
            <div className="text-sm font-medium text-white/90">Add price item</div>
            <form action={createPriceItem} className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="block">
                  <span className="text-[11px] text-white/55">Title HE</span>
                  <input name="titleHe" defaultValue="" className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
                </label>
                <label className="block">
                  <span className="text-[11px] text-white/55">Title EN</span>
                  <input name="titleEn" defaultValue="" className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
                </label>
                <label className="block">
                  <span className="text-[11px] text-white/55">Price label</span>
                  <input name="price" defaultValue="" className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
                </label>
                <label className="block">
                  <span className="text-[11px] text-white/55">Note HE</span>
                  <input name="noteHe" defaultValue="" className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
                </label>
                <label className="block">
                  <span className="text-[11px] text-white/55">Note EN</span>
                  <input name="noteEn" defaultValue="" className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
                </label>
              </div>

              <div className="space-y-3">
                <label className="block">
                  <span className="text-[11px] text-white/55">Details HE</span>
                  <textarea name="detailsHe" defaultValue="" rows={6} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none resize-none" />
                </label>
                <label className="block">
                  <span className="text-[11px] text-white/55">Details EN</span>
                  <textarea name="detailsEn" defaultValue="" rows={6} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none resize-none" />
                </label>
                <label className="block">
                  <span className="text-[11px] text-white/55">Order</span>
                  <input name="order" type="number" defaultValue={0} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
                </label>
                <button className="w-full rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/20 px-4 py-3 text-sm text-white hover:bg-[rgb(var(--red))]/30">
                  Create price item
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className="cc-glass rounded-3xl p-6">
          <h2 className="text-xl font-semibold text-[rgb(var(--blue))]">Catalogs</h2>

          <div className="mt-6 space-y-6">
            {catalogs.map((c) => (
              <div key={c.id} className="rounded-3xl border border-white/10 bg-black/20 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm text-white/55">slug: <span className="font-mono">{c.slug}</span></div>
                    <div className="mt-1 text-lg font-semibold text-white">{c.titleEn}</div>
                  </div>
                  <form action={deleteCatalog.bind(null, c.id)}>
                    <button className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/85 hover:bg-white/[0.10]">Delete</button>
                  </form>
                </div>

                <form action={updateCatalog.bind(null, c.id)} className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="block">
                        <span className="text-[11px] text-white/55">Title HE</span>
                        <input name="titleHe" defaultValue={c.titleHe} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
                      </label>
                      <label className="block">
                        <span className="text-[11px] text-white/55">Title EN</span>
                        <input name="titleEn" defaultValue={c.titleEn} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="block">
                        <span className="text-[11px] text-white/55">Short HE</span>
                        <input name="shortHe" defaultValue={c.shortDescriptionHe} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
                      </label>
                      <label className="block">
                        <span className="text-[11px] text-white/55">Short EN</span>
                        <input name="shortEn" defaultValue={c.shortDescriptionEn} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
                      </label>
                    </div>

                    <label className="block">
                      <span className="text-[11px] text-white/55">Long HE</span>
                      <textarea name="longHe" defaultValue={c.longDescriptionHe} rows={4} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none resize-none" />
                    </label>
                    <label className="block">
                      <span className="text-[11px] text-white/55">Long EN</span>
                      <textarea name="longEn" defaultValue={c.longDescriptionEn} rows={4} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none resize-none" />
                    </label>

                    <label className="block">
                      <span className="text-[11px] text-white/55">Tags (csv)</span>
                      <input name="tagsCsv" defaultValue={tagsToCsv(c.tagsJson)} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
                    </label>

                    <label className="flex items-center gap-2 text-sm text-white/80">
                      <input type="checkbox" name="popular" defaultChecked={c.popular} />
                      Mark as popular
                    </label>
                  </div>

                  <div className="space-y-3">
                    <UploadUrlInput name="coverImage" defaultValue={c.coverImage} label="Cover image (card)" accept="image/*" preview="image" />

                    <UploadUrlInput name="promoVideoUrl" defaultValue={c.promoVideoUrl} label="Promo video (Examples right panel)" accept="video/*" preview="video" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="block">
                        <span className="text-[11px] text-white/55">Promo title HE</span>
                        <input name="promoVideoTitleHe" defaultValue={c.promoVideoTitleHe} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
                      </label>
                      <label className="block">
                        <span className="text-[11px] text-white/55">Promo title EN</span>
                        <input name="promoVideoTitleEn" defaultValue={c.promoVideoTitleEn} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
                      </label>
                    </div>

                    <label className="block">
                      <span className="text-[11px] text-white/55">Promo description HE</span>
                      <textarea name="promoVideoDescriptionHe" defaultValue={c.promoVideoDescriptionHe} rows={3} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none resize-none" />
                    </label>
                    <label className="block">
                      <span className="text-[11px] text-white/55">Promo description EN</span>
                      <textarea name="promoVideoDescriptionEn" defaultValue={c.promoVideoDescriptionEn} rows={3} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none resize-none" />
                    </label>

                    <button className="w-full rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/20 px-4 py-3 text-sm text-white hover:bg-[rgb(var(--red))]/30">
                      Save catalog
                    </button>
                  </div>
                </form>

                <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-5">
                  <div className="text-sm font-medium text-white/90">Examples</div>

                  <div className="mt-4 space-y-4">
                    {c.examples
                      .slice()
                      .sort((a, b) => (a.order - b.order) || (a.id - b.id))
                      .map((e) => (
                        <div key={e.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="text-sm text-white/80">{e.titleEn}</div>
                            <form action={deleteExample.bind(null, e.id)}>
                              <button className="rounded-xl border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm text-white/85 hover:bg-white/[0.10]">
                                Delete
                              </button>
                            </form>
                          </div>

                          <form action={updateExample.bind(null, e.id)} className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <label className="block">
                                  <span className="text-[11px] text-white/55">Title HE</span>
                                  <input name="titleHe" defaultValue={e.titleHe} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
                                </label>
                                <label className="block">
                                  <span className="text-[11px] text-white/55">Title EN</span>
                                  <input name="titleEn" defaultValue={e.titleEn} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
                                </label>
                              </div>

                              <UploadUrlInput name="previewImage" defaultValue={e.previewImage} label="Preview image" accept="image/*" preview="image" />

                              <UploadUrlInput name="videoUrl" defaultValue={e.videoUrl} label="Video (optional)" accept="video/*" preview="video" />

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <label className="block">
                                  <span className="text-[11px] text-white/55">Order</span>
                                  <input name="order" type="number" defaultValue={e.order} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
                                </label>
                                <label className="block">
                                  <span className="text-[11px] text-white/55">Link (optional)</span>
                                  <input name="link" defaultValue={e.link} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
                                </label>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <label className="block">
                                <span className="text-[11px] text-white/55">Description HE</span>
                                <textarea name="descriptionHe" defaultValue={e.descriptionHe} rows={5} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none resize-none" />
                              </label>
                              <label className="block">
                                <span className="text-[11px] text-white/55">Description EN</span>
                                <textarea name="descriptionEn" defaultValue={e.descriptionEn} rows={5} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none resize-none" />
                              </label>

                              <button className="w-full rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/20 px-4 py-3 text-sm text-white hover:bg-[rgb(var(--red))]/30">
                                Save example
                              </button>
                            </div>
                          </form>
                        </div>
                      ))}
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-sm font-medium text-white/90">Add example</div>
                    <form action={createExample.bind(null, c.id)} className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <label className="block">
                            <span className="text-[11px] text-white/55">Title HE</span>
                            <input name="titleHe" defaultValue="" className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
                          </label>
                          <label className="block">
                            <span className="text-[11px] text-white/55">Title EN</span>
                            <input name="titleEn" defaultValue="" className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
                          </label>
                        </div>

                        <UploadUrlInput name="previewImage" defaultValue="" label="Preview image" accept="image/*" preview="image" />

                        <UploadUrlInput name="videoUrl" defaultValue="" label="Video (optional)" accept="video/*" preview="video" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <label className="block">
                            <span className="text-[11px] text-white/55">Order</span>
                            <input name="order" type="number" defaultValue={0} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
                          </label>
                          <label className="block">
                            <span className="text-[11px] text-white/55">Link (optional)</span>
                            <input name="link" defaultValue="" className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
                          </label>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="block">
                          <span className="text-[11px] text-white/55">Description HE</span>
                          <textarea name="descriptionHe" defaultValue="" rows={5} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none resize-none" />
                        </label>
                        <label className="block">
                          <span className="text-[11px] text-white/55">Description EN</span>
                          <textarea name="descriptionEn" defaultValue="" rows={5} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none resize-none" />
                        </label>
                        <button className="w-full rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/20 px-4 py-3 text-sm text-white hover:bg-[rgb(var(--red))]/30">
                          Create example
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-black/20 p-5">
            <div className="text-sm font-medium text-white/90">Add catalog</div>

            <form action={createCatalog} className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="block">
                  <span className="text-[11px] text-white/55">slug (unique)</span>
                  <input name="slug" defaultValue="" placeholder="bars" className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none font-mono" />
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-[11px] text-white/55">Title HE</span>
                    <input name="titleHe" defaultValue="" className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
                  </label>
                  <label className="block">
                    <span className="text-[11px] text-white/55">Title EN</span>
                    <input name="titleEn" defaultValue="" className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-[11px] text-white/55">Short HE</span>
                    <input name="shortHe" defaultValue="" className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
                  </label>
                  <label className="block">
                    <span className="text-[11px] text-white/55">Short EN</span>
                    <input name="shortEn" defaultValue="" className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
                  </label>
                </div>

                <label className="block">
                  <span className="text-[11px] text-white/55">Long HE</span>
                  <textarea name="longHe" defaultValue="" rows={4} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none resize-none" />
                </label>
                <label className="block">
                  <span className="text-[11px] text-white/55">Long EN</span>
                  <textarea name="longEn" defaultValue="" rows={4} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none resize-none" />
                </label>

                <label className="block">
                  <span className="text-[11px] text-white/55">Tags (csv)</span>
                  <input name="tagsCsv" defaultValue="" className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
                </label>

                <label className="flex items-center gap-2 text-sm text-white/80">
                  <input type="checkbox" name="popular" defaultChecked={false} />
                  Mark as popular
                </label>
              </div>

              <div className="space-y-3">
                <UploadUrlInput name="coverImage" defaultValue="" label="Cover image (card)" accept="image/*" preview="image" />

                <UploadUrlInput name="promoVideoUrl" defaultValue="" label="Promo video (Examples right panel)" accept="video/*" preview="video" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-[11px] text-white/55">Promo title HE</span>
                    <input name="promoVideoTitleHe" defaultValue="" className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
                  </label>
                  <label className="block">
                    <span className="text-[11px] text-white/55">Promo title EN</span>
                    <input name="promoVideoTitleEn" defaultValue="" className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
                  </label>
                </div>

                <label className="block">
                  <span className="text-[11px] text-white/55">Promo description HE</span>
                  <textarea name="promoVideoDescriptionHe" defaultValue="" rows={3} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none resize-none" />
                </label>
                <label className="block">
                  <span className="text-[11px] text-white/55">Promo description EN</span>
                  <textarea name="promoVideoDescriptionEn" defaultValue="" rows={3} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none resize-none" />
                </label>

                <button className="w-full rounded-xl border border-[rgb(var(--red))]/40 bg-[rgb(var(--red))]/20 px-4 py-3 text-sm text-white hover:bg-[rgb(var(--red))]/30">
                  Create catalog
                </button>
              </div>
            </form>
          </div>
        </section>

        <div className="text-xs text-white/45">
          Tip: upload images/videos with Cloudinary env, or store locally in <span className="font-mono">public/uploads</span>.
        </div>
      </main>
    </div>
  );
}
