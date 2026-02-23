"use client";

import { useState, useTransition } from "react";
import type { CategoryDetail } from "@/content/categoryDetails";
import { updateCategoryDetailAction } from "@/app/admin/actions";

export function AdminCategoryDetailEditor(props: { details: CategoryDetail[] }) {
  const [items, setItems] = useState(props.details);
  const [editSlug, setEditSlug] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const editing = editSlug ? items.find((d) => d.slug === editSlug) : null;

  function updateField(slug: string, updater: (d: CategoryDetail) => CategoryDetail) {
    setItems((prev) => prev.map((d) => (d.slug === slug ? updater(d) : d)));
    setSaved(false);
  }

  function save(detail: CategoryDetail) {
    startTransition(async () => {
      await updateCategoryDetailAction(JSON.stringify(detail));
      setSaved(true);
    });
  }

  if (!editing) {
    return (
      <div className="space-y-2">
        {items.map((d) => (
          <div key={d.slug} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3">
            <div>
              <div className="text-sm font-mono text-white/60">{d.slug}</div>
              <div className="text-sm text-white/90">{d.label.en}</div>
            </div>
            <button
              type="button"
              onClick={() => { setEditSlug(d.slug); setSaved(false); }}
              className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm text-white/80 hover:bg-white/[0.10]"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    );
  }

  const d = editing;
  const slug = d.slug;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setEditSlug(null)}
          className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm text-white/80 hover:bg-white/[0.10]"
        >
          ← Back
        </button>
        <div className="text-sm font-mono text-white/60">{slug}</div>
      </div>

      {/* Label */}
      <fieldset className="rounded-xl border border-white/10 p-3 space-y-2">
        <legend className="text-xs text-white/55 px-1">Label</legend>
        <div className="grid grid-cols-2 gap-2">
          <label className="block">
            <span className="text-[11px] text-white/55">HE</span>
            <input value={d.label.he} onChange={(e) => updateField(slug, (x) => ({ ...x, label: { ...x.label, he: e.target.value } }))} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
          </label>
          <label className="block">
            <span className="text-[11px] text-white/55">EN</span>
            <input value={d.label.en} onChange={(e) => updateField(slug, (x) => ({ ...x, label: { ...x.label, en: e.target.value } }))} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
          </label>
        </div>
      </fieldset>

      {/* Pills */}
      <fieldset className="rounded-xl border border-white/10 p-3 space-y-2">
        <legend className="text-xs text-white/55 px-1">Pills (tags)</legend>
        {d.pills.map((pill, i) => (
          <div key={i} className="grid grid-cols-2 gap-2">
            <input value={pill.he} onChange={(e) => updateField(slug, (x) => { const p = [...x.pills]; p[i] = { ...p[i], he: e.target.value }; return { ...x, pills: p }; })} placeholder="HE" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
            <input value={pill.en} onChange={(e) => updateField(slug, (x) => { const p = [...x.pills]; p[i] = { ...p[i], en: e.target.value }; return { ...x, pills: p }; })} placeholder="EN" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
          </div>
        ))}
      </fieldset>

      {/* What you get */}
      <fieldset className="rounded-xl border border-white/10 p-3 space-y-2">
        <legend className="text-xs text-white/55 px-1">What you get (bullets)</legend>
        {d.whatYouGet.map((item, i) => (
          <div key={i} className="grid grid-cols-2 gap-2">
            <input value={item.he} onChange={(e) => updateField(slug, (x) => { const w = [...x.whatYouGet]; w[i] = { ...w[i], he: e.target.value }; return { ...x, whatYouGet: w }; })} placeholder="HE" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
            <input value={item.en} onChange={(e) => updateField(slug, (x) => { const w = [...x.whatYouGet]; w[i] = { ...w[i], en: e.target.value }; return { ...x, whatYouGet: w }; })} placeholder="EN" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
          </div>
        ))}
      </fieldset>

      {/* Best for */}
      <fieldset className="rounded-xl border border-white/10 p-3 space-y-2">
        <legend className="text-xs text-white/55 px-1">Best for</legend>
        <div className="grid grid-cols-2 gap-2">
          <textarea value={d.bestFor.he} onChange={(e) => updateField(slug, (x) => ({ ...x, bestFor: { ...x.bestFor, he: e.target.value } }))} rows={2} placeholder="HE" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none resize-y" />
          <textarea value={d.bestFor.en} onChange={(e) => updateField(slug, (x) => ({ ...x, bestFor: { ...x.bestFor, en: e.target.value } }))} rows={2} placeholder="EN" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none resize-y" />
        </div>
      </fieldset>

      {/* Process steps */}
      <fieldset className="rounded-xl border border-white/10 p-3 space-y-2">
        <legend className="text-xs text-white/55 px-1">Process (3 steps)</legend>
        {d.process.map((step, i) => (
          <div key={i} className="grid grid-cols-2 gap-2">
            <input value={step.title.he} onChange={(e) => updateField(slug, (x) => { const p = [...x.process]; p[i] = { title: { ...p[i].title, he: e.target.value } }; return { ...x, process: p }; })} placeholder={`Step ${i + 1} HE`} className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
            <input value={step.title.en} onChange={(e) => updateField(slug, (x) => { const p = [...x.process]; p[i] = { title: { ...p[i].title, en: e.target.value } }; return { ...x, process: p }; })} placeholder={`Step ${i + 1} EN`} className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
          </div>
        ))}
      </fieldset>

      {/* Pricing tiers */}
      <fieldset className="rounded-xl border border-white/10 p-3 space-y-2">
        <legend className="text-xs text-white/55 px-1">Pricing tiers</legend>
        {d.pricingTiers.map((tier, i) => (
          <div key={i} className="grid grid-cols-3 gap-2 items-center">
            <input value={tier.label} onChange={(e) => updateField(slug, (x) => { const t = [...x.pricingTiers]; t[i] = { ...t[i], label: e.target.value }; return { ...x, pricingTiers: t }; })} placeholder="Label" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
            <input value={tier.range.he} onChange={(e) => updateField(slug, (x) => { const t = [...x.pricingTiers]; t[i] = { ...t[i], range: { ...t[i].range, he: e.target.value } }; return { ...x, pricingTiers: t }; })} placeholder="Range HE" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
            <input value={tier.range.en} onChange={(e) => updateField(slug, (x) => { const t = [...x.pricingTiers]; t[i] = { ...t[i], range: { ...t[i].range, en: e.target.value } }; return { ...x, pricingTiers: t }; })} placeholder="Range EN" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
          </div>
        ))}
        <div className="grid grid-cols-2 gap-2 mt-2">
          <input value={d.pricingNote.he} onChange={(e) => updateField(slug, (x) => ({ ...x, pricingNote: { ...x.pricingNote, he: e.target.value } }))} placeholder="Note HE" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
          <input value={d.pricingNote.en} onChange={(e) => updateField(slug, (x) => ({ ...x, pricingNote: { ...x.pricingNote, en: e.target.value } }))} placeholder="Note EN" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
        </div>
      </fieldset>

      {/* Why this works */}
      <fieldset className="rounded-xl border border-white/10 p-3 space-y-2">
        <legend className="text-xs text-white/55 px-1">Why this works</legend>
        {d.whyThisWorks.map((item, i) => (
          <div key={i} className="grid grid-cols-2 gap-2">
            <input value={item.he} onChange={(e) => updateField(slug, (x) => { const w = [...x.whyThisWorks]; w[i] = { ...w[i], he: e.target.value }; return { ...x, whyThisWorks: w }; })} placeholder="HE" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
            <input value={item.en} onChange={(e) => updateField(slug, (x) => { const w = [...x.whyThisWorks]; w[i] = { ...w[i], en: e.target.value }; return { ...x, whyThisWorks: w }; })} placeholder="EN" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
          </div>
        ))}
      </fieldset>

      {/* FAQ */}
      <fieldset className="rounded-xl border border-white/10 p-3 space-y-3">
        <legend className="text-xs text-white/55 px-1">FAQ</legend>
        {d.faq.map((faq, i) => (
          <div key={i} className="space-y-1 rounded-lg border border-white/5 p-2">
            <div className="text-[10px] text-white/40">Q{i + 1}</div>
            <div className="grid grid-cols-2 gap-2">
              <input value={faq.q.he} onChange={(e) => updateField(slug, (x) => { const f = [...x.faq]; f[i] = { ...f[i], q: { ...f[i].q, he: e.target.value } }; return { ...x, faq: f }; })} placeholder="Question HE" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
              <input value={faq.q.en} onChange={(e) => updateField(slug, (x) => { const f = [...x.faq]; f[i] = { ...f[i], q: { ...f[i].q, en: e.target.value } }; return { ...x, faq: f }; })} placeholder="Question EN" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <textarea value={faq.a.he} onChange={(e) => updateField(slug, (x) => { const f = [...x.faq]; f[i] = { ...f[i], a: { ...f[i].a, he: e.target.value } }; return { ...x, faq: f }; })} rows={2} placeholder="Answer HE" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none resize-y" />
              <textarea value={faq.a.en} onChange={(e) => updateField(slug, (x) => { const f = [...x.faq]; f[i] = { ...f[i], a: { ...f[i].a, en: e.target.value } }; return { ...x, faq: f }; })} rows={2} placeholder="Answer EN" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none resize-y" />
            </div>
          </div>
        ))}
      </fieldset>

      {/* Social proof */}
      <fieldset className="rounded-xl border border-white/10 p-3 space-y-2">
        <legend className="text-xs text-white/55 px-1">Social proof placeholders</legend>
        {d.socialProof.map((card, i) => (
          <div key={i} className="grid grid-cols-2 gap-2">
            <input value={card.title.he} onChange={(e) => updateField(slug, (x) => { const s = [...x.socialProof]; s[i] = { title: { ...s[i].title, he: e.target.value } }; return { ...x, socialProof: s }; })} placeholder="HE" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
            <input value={card.title.en} onChange={(e) => updateField(slug, (x) => { const s = [...x.socialProof]; s[i] = { title: { ...s[i].title, en: e.target.value } }; return { ...x, socialProof: s }; })} placeholder="EN" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
          </div>
        ))}
      </fieldset>

      {/* CTA labels */}
      <fieldset className="rounded-xl border border-white/10 p-3 space-y-2">
        <legend className="text-xs text-white/55 px-1">CTA button labels</legend>
        <div className="text-[10px] text-white/40">Primary</div>
        <div className="grid grid-cols-2 gap-2">
          <input value={d.ctaPrimary.he} onChange={(e) => updateField(slug, (x) => ({ ...x, ctaPrimary: { ...x.ctaPrimary, he: e.target.value } }))} placeholder="HE" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
          <input value={d.ctaPrimary.en} onChange={(e) => updateField(slug, (x) => ({ ...x, ctaPrimary: { ...x.ctaPrimary, en: e.target.value } }))} placeholder="EN" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
        </div>
        <div className="text-[10px] text-white/40">Secondary</div>
        <div className="grid grid-cols-2 gap-2">
          <input value={d.ctaSecondary.he} onChange={(e) => updateField(slug, (x) => ({ ...x, ctaSecondary: { ...x.ctaSecondary, he: e.target.value } }))} placeholder="HE" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
          <input value={d.ctaSecondary.en} onChange={(e) => updateField(slug, (x) => ({ ...x, ctaSecondary: { ...x.ctaSecondary, en: e.target.value } }))} placeholder="EN" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
        </div>
      </fieldset>

      {/* WhatsApp templates */}
      <fieldset className="rounded-xl border border-white/10 p-3 space-y-2">
        <legend className="text-xs text-white/55 px-1">WhatsApp templates</legend>
        <div className="text-[10px] text-white/40">Primary (after HOLD)</div>
        <div className="grid grid-cols-2 gap-2">
          <textarea value={d.whatsappTemplatePrimary.he} onChange={(e) => updateField(slug, (x) => ({ ...x, whatsappTemplatePrimary: { ...x.whatsappTemplatePrimary, he: e.target.value } }))} rows={2} placeholder="HE" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none resize-y" />
          <textarea value={d.whatsappTemplatePrimary.en} onChange={(e) => updateField(slug, (x) => ({ ...x, whatsappTemplatePrimary: { ...x.whatsappTemplatePrimary, en: e.target.value } }))} rows={2} placeholder="EN" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none resize-y" />
        </div>
        <div className="text-[10px] text-white/40">Secondary (quick question)</div>
        <div className="grid grid-cols-2 gap-2">
          <textarea value={d.whatsappTemplateSecondary.he} onChange={(e) => updateField(slug, (x) => ({ ...x, whatsappTemplateSecondary: { ...x.whatsappTemplateSecondary, he: e.target.value } }))} rows={2} placeholder="HE" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none resize-y" />
          <textarea value={d.whatsappTemplateSecondary.en} onChange={(e) => updateField(slug, (x) => ({ ...x, whatsappTemplateSecondary: { ...x.whatsappTemplateSecondary, en: e.target.value } }))} rows={2} placeholder="EN" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none resize-y" />
        </div>
      </fieldset>

      {/* Save */}
      <button
        type="button"
        disabled={pending}
        onClick={() => save(d)}
        className="w-full rounded-xl border border-[rgb(var(--blue))]/30 bg-[rgb(var(--blue))]/10 px-4 py-3 text-sm font-medium text-white hover:bg-[rgb(var(--blue))]/20 disabled:opacity-50 transition-all"
      >
        {pending ? "Saving…" : saved ? "Saved ✓" : "Save category detail"}
      </button>
    </div>
  );
}
