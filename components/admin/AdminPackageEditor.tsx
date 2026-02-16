"use client";

import { useState, useTransition } from "react";
import type { PackageDetail } from "@/lib/packageConfigStore";
import { updatePackageDetails } from "@/app/admin/actions";

export function AdminPackageEditor(props: { packages: PackageDetail[] }) {
  const [items, setItems] = useState(props.packages);
  const [editId, setEditId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const editing = editId ? items.find((d) => d.id === editId) : null;

  function updateField(id: string, updater: (d: PackageDetail) => PackageDetail) {
    setItems((prev) => prev.map((d) => (d.id === id ? updater(d) : d)));
    setSaved(false);
  }

  function save() {
    startTransition(async () => {
      await updatePackageDetails(JSON.stringify(items));
      setSaved(true);
    });
  }

  if (!editing) {
    return (
      <div className="space-y-2">
        {items.map((d) => (
          <div key={d.id} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/20 px-4 py-3">
            <div>
              <div className="text-sm font-mono text-white/60">{d.id}</div>
              <div className="text-sm text-white/90">{d.title.en} — ₪{d.priceFrom}+</div>
            </div>
            <button
              type="button"
              onClick={() => { setEditId(d.id); setSaved(false); }}
              className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm text-white/80 hover:bg-white/[0.10]"
            >
              Edit
            </button>
          </div>
        ))}

        <button
          type="button"
          disabled={pending}
          onClick={save}
          className="w-full rounded-xl border border-[rgb(var(--blue))]/30 bg-[rgb(var(--blue))]/10 px-4 py-3 text-sm font-medium text-white hover:bg-[rgb(var(--blue))]/20 disabled:opacity-50 transition-all"
        >
          {pending ? "Saving…" : saved ? "Saved ✓" : "Save all packages"}
        </button>
      </div>
    );
  }

  const d = editing;
  const id = d.id;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setEditId(null)}
          className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm text-white/80 hover:bg-white/[0.10]"
        >
          ← Back
        </button>
        <div className="text-sm font-mono text-white/60">{id}</div>
      </div>

      {/* Title */}
      <fieldset className="rounded-xl border border-white/10 p-3 space-y-2">
        <legend className="text-xs text-white/55 px-1">Title</legend>
        <div className="grid grid-cols-2 gap-2">
          <label className="block">
            <span className="text-[11px] text-white/55">HE</span>
            <input value={d.title.he} onChange={(e) => updateField(id, (x) => ({ ...x, title: { ...x.title, he: e.target.value } }))} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
          </label>
          <label className="block">
            <span className="text-[11px] text-white/55">EN</span>
            <input value={d.title.en} onChange={(e) => updateField(id, (x) => ({ ...x, title: { ...x.title, en: e.target.value } }))} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
          </label>
        </div>
      </fieldset>

      {/* Subtitle */}
      <fieldset className="rounded-xl border border-white/10 p-3 space-y-2">
        <legend className="text-xs text-white/55 px-1">Subtitle</legend>
        <div className="grid grid-cols-2 gap-2">
          <label className="block">
            <span className="text-[11px] text-white/55">HE</span>
            <input value={d.subtitle.he} onChange={(e) => updateField(id, (x) => ({ ...x, subtitle: { ...x.subtitle, he: e.target.value } }))} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
          </label>
          <label className="block">
            <span className="text-[11px] text-white/55">EN</span>
            <input value={d.subtitle.en} onChange={(e) => updateField(id, (x) => ({ ...x, subtitle: { ...x.subtitle, en: e.target.value } }))} className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
          </label>
        </div>
      </fieldset>

      {/* Price from */}
      <fieldset className="rounded-xl border border-white/10 p-3 space-y-2">
        <legend className="text-xs text-white/55 px-1">Price from (₪)</legend>
        <input type="number" value={d.priceFrom} onChange={(e) => updateField(id, (x) => ({ ...x, priceFrom: Number(e.target.value) || 0 }))} className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none" />
      </fieldset>

      {/* Pills */}
      <fieldset className="rounded-xl border border-white/10 p-3 space-y-2">
        <legend className="text-xs text-white/55 px-1">Pills (tags)</legend>
        {d.pills.map((pill, i) => (
          <div key={i} className="grid grid-cols-2 gap-2">
            <input value={pill.he} onChange={(e) => updateField(id, (x) => { const p = [...x.pills]; p[i] = { ...p[i], he: e.target.value }; return { ...x, pills: p }; })} placeholder="HE" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
            <input value={pill.en} onChange={(e) => updateField(id, (x) => { const p = [...x.pills]; p[i] = { ...p[i], en: e.target.value }; return { ...x, pills: p }; })} placeholder="EN" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
          </div>
        ))}
      </fieldset>

      {/* Shoot time */}
      <fieldset className="rounded-xl border border-white/10 p-3 space-y-2">
        <legend className="text-xs text-white/55 px-1">Shoot time</legend>
        <div className="grid grid-cols-2 gap-2">
          <input value={d.shootTime.he} onChange={(e) => updateField(id, (x) => ({ ...x, shootTime: { ...x.shootTime, he: e.target.value } }))} placeholder="HE" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
          <input value={d.shootTime.en} onChange={(e) => updateField(id, (x) => ({ ...x, shootTime: { ...x.shootTime, en: e.target.value } }))} placeholder="EN" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
        </div>
      </fieldset>

      {/* Delivery time */}
      <fieldset className="rounded-xl border border-white/10 p-3 space-y-2">
        <legend className="text-xs text-white/55 px-1">Delivery time</legend>
        <div className="grid grid-cols-2 gap-2">
          <input value={d.deliveryTime.he} onChange={(e) => updateField(id, (x) => ({ ...x, deliveryTime: { ...x.deliveryTime, he: e.target.value } }))} placeholder="HE" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
          <input value={d.deliveryTime.en} onChange={(e) => updateField(id, (x) => ({ ...x, deliveryTime: { ...x.deliveryTime, en: e.target.value } }))} placeholder="EN" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
        </div>
      </fieldset>

      {/* Locations */}
      <fieldset className="rounded-xl border border-white/10 p-3 space-y-2">
        <legend className="text-xs text-white/55 px-1">Locations</legend>
        <div className="grid grid-cols-2 gap-2">
          <input value={d.locations.he} onChange={(e) => updateField(id, (x) => ({ ...x, locations: { ...x.locations, he: e.target.value } }))} placeholder="HE" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
          <input value={d.locations.en} onChange={(e) => updateField(id, (x) => ({ ...x, locations: { ...x.locations, en: e.target.value } }))} placeholder="EN" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
        </div>
      </fieldset>

      {/* Revisions */}
      <fieldset className="rounded-xl border border-white/10 p-3 space-y-2">
        <legend className="text-xs text-white/55 px-1">Revisions</legend>
        <div className="grid grid-cols-2 gap-2">
          <input value={d.revisions.he} onChange={(e) => updateField(id, (x) => ({ ...x, revisions: { ...x.revisions, he: e.target.value } }))} placeholder="HE" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
          <input value={d.revisions.en} onChange={(e) => updateField(id, (x) => ({ ...x, revisions: { ...x.revisions, en: e.target.value } }))} placeholder="EN" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
        </div>
      </fieldset>

      {/* Best for */}
      <fieldset className="rounded-xl border border-white/10 p-3 space-y-2">
        <legend className="text-xs text-white/55 px-1">Best for</legend>
        <div className="grid grid-cols-2 gap-2">
          <textarea value={d.bestFor.he} onChange={(e) => updateField(id, (x) => ({ ...x, bestFor: { ...x.bestFor, he: e.target.value } }))} rows={2} placeholder="HE" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none resize-y" />
          <textarea value={d.bestFor.en} onChange={(e) => updateField(id, (x) => ({ ...x, bestFor: { ...x.bestFor, en: e.target.value } }))} rows={2} placeholder="EN" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none resize-y" />
        </div>
      </fieldset>

      {/* What you get */}
      <fieldset className="rounded-xl border border-white/10 p-3 space-y-2">
        <legend className="text-xs text-white/55 px-1">What you get (bullets)</legend>
        {d.whatYouGet.map((item, i) => (
          <div key={i} className="grid grid-cols-2 gap-2">
            <input value={item.he} onChange={(e) => updateField(id, (x) => { const w = [...x.whatYouGet]; w[i] = { ...w[i], he: e.target.value }; return { ...x, whatYouGet: w }; })} placeholder="HE" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
            <input value={item.en} onChange={(e) => updateField(id, (x) => { const w = [...x.whatYouGet]; w[i] = { ...w[i], en: e.target.value }; return { ...x, whatYouGet: w }; })} placeholder="EN" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
          </div>
        ))}
      </fieldset>

      {/* Add-ons */}
      <fieldset className="rounded-xl border border-white/10 p-3 space-y-2">
        <legend className="text-xs text-white/55 px-1">Add-ons</legend>
        {d.addOns.map((item, i) => (
          <div key={i} className="grid grid-cols-2 gap-2">
            <input value={item.he} onChange={(e) => updateField(id, (x) => { const a = [...x.addOns]; a[i] = { ...a[i], he: e.target.value }; return { ...x, addOns: a }; })} placeholder="HE" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
            <input value={item.en} onChange={(e) => updateField(id, (x) => { const a = [...x.addOns]; a[i] = { ...a[i], en: e.target.value }; return { ...x, addOns: a }; })} placeholder="EN" className="rounded-xl border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white outline-none" />
          </div>
        ))}
      </fieldset>

      {/* Save */}
      <button
        type="button"
        disabled={pending}
        onClick={save}
        className="w-full rounded-xl border border-[rgb(var(--blue))]/30 bg-[rgb(var(--blue))]/10 px-4 py-3 text-sm font-medium text-white hover:bg-[rgb(var(--blue))]/20 disabled:opacity-50 transition-all"
      >
        {pending ? "Saving…" : saved ? "Saved ✓" : "Save all packages"}
      </button>
    </div>
  );
}
