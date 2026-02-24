"use client";

import { useState, useEffect, useCallback } from "react";

type MediaAsset = {
  id: string;
  kind: string;
  url: string;
  posterUrl: string | null;
};

type PackageExample = {
  id: string;
  order: number;
  isPublished: boolean;
  catalogKey: string | null;
  tierKey: string;
  mediaId: string;
  media: MediaAsset;
};

const TIER_OPTIONS = [
  { value: "tier1", label: "Starter (tier1)" },
  { value: "tier2", label: "Business (tier2)" },
  { value: "tier3", label: "Monthly (tier3)" },
] as const;

const CATALOG_OPTIONS = [
  { value: "", label: "All catalogs" },
  { value: "bars", label: "Bars" },
  { value: "hotels", label: "Hotels" },
  { value: "events", label: "Events" },
  { value: "restaurants", label: "Restaurants" },
  { value: "real-estate", label: "Real Estate" },
  { value: "other", label: "Other" },
] as const;

const emptyForm = {
  tierKey: "tier1" as string,
  catalogKey: "" as string,
  posterUrl: "" as string,
};

export default function AdminExamplesPage() {
  const [examples, setExamples] = useState<PackageExample[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterTier, setFilterTier] = useState("tier1");
  const [filterCatalog, setFilterCatalog] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchExamples = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ tierKey: filterTier });
      if (filterCatalog) params.set("catalogKey", filterCatalog);
      const res = await fetch(`/api/admin/examples?${params}`);
      if (res.ok) setExamples(await res.json());
    } finally {
      setLoading(false);
    }
  }, [filterTier, filterCatalog]);

  useEffect(() => {
    fetchExamples();
  }, [fetchExamples]);

  function openAdd() {
    setForm({ ...emptyForm, tierKey: filterTier, catalogKey: filterCatalog });
    setFile(null);
    setError("");
    setModalOpen(true);
  }

  async function handleSave() {
    if (!file) {
      setError("Please select a file to upload");
      return;
    }
    if (!form.tierKey) {
      setError("Tier is required");
      return;
    }

    setSaving(true);
    setUploading(true);
    setError("");

    try {
      // 1. Upload file
      const fd = new FormData();
      fd.append("file", file);
      const uploadRes = await fetch("/api/admin/media/upload", { method: "POST", body: fd });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error || "Upload failed");

      setUploading(false);

      // 2. Create example
      const payload = {
        tierKey: form.tierKey,
        catalogKey: form.catalogKey || undefined,
        media: {
          url: uploadData.url,
          kind: uploadData.kind,
          posterUrl: form.posterUrl || undefined,
        },
      };

      const res = await fetch("/api/admin/examples", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Save failed");
      }

      setModalOpen(false);
      fetchExamples();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
      setUploading(false);
    }
  }

  async function handleTogglePublish(ex: PackageExample) {
    await fetch(`/api/admin/examples/${ex.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublished: !ex.isPublished }),
    });
    fetchExamples();
  }

  async function handleMove(id: string, direction: "up" | "down") {
    const idx = examples.findIndex((e) => e.id === id);
    if (idx < 0) return;
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= examples.length) return;

    const newOrder = [...examples];
    [newOrder[idx], newOrder[swapIdx]] = [newOrder[swapIdx], newOrder[idx]];
    setExamples(newOrder);

    await fetch("/api/admin/examples/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: newOrder.map((e, i) => ({ id: e.id, order: i })),
      }),
    });
    fetchExamples();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/admin/examples/${id}?deleteAsset=true`, { method: "DELETE" });
    setDeleteConfirm(null);
    fetchExamples();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;

    const allowed = [
      "image/jpeg", "image/png", "image/webp", "image/gif",
      "video/mp4", "video/quicktime", "video/webm",
    ];
    if (!allowed.includes(f.type)) {
      setError("Only jpg, png, webp, gif, mp4, mov, webm allowed");
      return;
    }
    const isVideo = f.type.startsWith("video/");
    const maxSize = isVideo ? 60 * 1024 * 1024 : 8 * 1024 * 1024;
    if (f.size > maxSize) {
      setError(isVideo ? "Max 60MB for videos" : "Max 8MB for images");
      return;
    }
    setFile(f);
    setError("");
  }

  const inputCls = "w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-white/25 transition-colors";
  const labelCls = "block text-[11px] text-white/55 mb-1";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f14] via-[#0a0c10] to-[#06070a] text-white" dir="ltr">
      {/* Header - matching admin layout */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/60 backdrop-blur-lg">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-2">
          <a href="/admin" className="font-medium text-sm shrink-0 hover:text-white/80 transition-colors">← Admin</a>
          <h1 className="text-sm font-medium">Package Examples</h1>
          <div className="w-16" />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Title + Add button */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-[rgb(var(--blue))]">Package Examples</h2>
            <p className="text-xs text-white/40 mt-1">Manage example media shown inside package cards</p>
          </div>
          <button onClick={openAdd} className="rounded-xl border border-[rgb(var(--blue))]/40 bg-[rgb(var(--blue))]/20 px-4 py-2 text-sm font-medium text-white hover:bg-[rgb(var(--blue))]/30 transition-colors">
            + Upload New Example
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div>
            <label className={labelCls}>Tier</label>
            <select value={filterTier} onChange={(e) => setFilterTier(e.target.value)} className={inputCls + " w-44"}>
              {TIER_OPTIONS.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Catalog</label>
            <select value={filterCatalog} onChange={(e) => setFilterCatalog(e.target.value)} className={inputCls + " w-44"}>
              {CATALOG_OPTIONS.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading */}
        {loading && <div className="text-white/50 text-sm py-8 text-center">Loading…</div>}

        {/* Empty state */}
        {!loading && examples.length === 0 && (
          <div className="text-white/40 text-sm py-8 text-center">No examples yet for this filter. Click &quot;+ Upload New Example&quot; to add one.</div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {examples.map((ex, idx) => (
            <div key={ex.id} className="rounded-2xl border border-white/10 bg-[rgba(11,15,20,0.55)] backdrop-blur-xl p-3 flex flex-col">
              {/* Thumbnail */}
              <div className="relative w-full aspect-square rounded-lg bg-white/5 overflow-hidden mb-2">
                {ex.media.kind === "video" ? (
                  <>
                    {ex.media.posterUrl ? (
                      <img src={ex.media.posterUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <video src={ex.media.url} className="w-full h-full object-cover" muted preload="metadata" />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full bg-black/50 border border-white/15 w-7 h-7 flex items-center justify-center">
                        <span className="text-white text-xs">▶</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <img src={ex.media.url} alt="" className="w-full h-full object-cover" />
                )}
                {/* Kind badge */}
                <span className="absolute top-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[9px] text-white/70 uppercase">
                  {ex.media.kind}
                </span>
              </div>

              {/* Order + published */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-white/30">#{idx + 1}</span>
                <button
                  onClick={() => handleTogglePublish(ex)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-medium border transition-colors ${ex.isPublished ? "border-green-500/30 bg-green-500/10 text-green-400" : "border-white/10 bg-white/5 text-white/40"}`}
                >
                  {ex.isPublished ? "Published" : "Draft"}
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  <button onClick={() => handleMove(ex.id, "up")} disabled={idx === 0} className="p-1 rounded hover:bg-white/10 text-white/40 hover:text-white disabled:opacity-20 text-xs transition-colors" title="Move up">↑</button>
                  <button onClick={() => handleMove(ex.id, "down")} disabled={idx === examples.length - 1} className="p-1 rounded hover:bg-white/10 text-white/40 hover:text-white disabled:opacity-20 text-xs transition-colors" title="Move down">↓</button>
                </div>
                <button onClick={() => setDeleteConfirm(ex.id)} className="px-1.5 py-0.5 rounded hover:bg-red-500/10 text-red-400/50 hover:text-red-400 text-[10px] transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)}>
          <div className="rounded-2xl border border-white/10 bg-[#0b0f14] p-6 max-w-sm w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white">Delete Example?</h3>
            <p className="text-sm text-white/50 mt-2">This will delete the example and its media asset.</p>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-sm text-white/70 hover:bg-white/10 transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="px-4 py-2 rounded-xl border border-red-500/30 bg-red-500/20 text-sm text-red-400 hover:bg-red-500/30 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Upload modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-8" onClick={() => setModalOpen(false)}>
          <div className="rounded-2xl border border-white/10 bg-[#0b0f14] p-6 max-w-lg w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white mb-4">Upload New Example</h3>

            {error && <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">{error}</div>}

            <div className="space-y-4">
              {/* File input */}
              <div>
                <label className={labelCls}>Media file (jpg/png/webp/gif/mp4/mov/webm) *</label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/quicktime,video/webm"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-white/50 file:mr-3 file:rounded-lg file:border file:border-white/10 file:bg-white/5 file:px-3 file:py-1.5 file:text-sm file:text-white/70 hover:file:bg-white/10 file:transition-colors"
                />
                {file && (
                  <p className="text-xs text-white/40 mt-1">
                    {file.name} ({(file.size / 1024 / 1024).toFixed(1)}MB)
                  </p>
                )}
              </div>

              {/* Tier */}
              <div>
                <label className={labelCls}>Tier *</label>
                <select value={form.tierKey} onChange={(e) => setForm((f) => ({ ...f, tierKey: e.target.value }))} className={inputCls}>
                  {TIER_OPTIONS.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>

              {/* Catalog */}
              <div>
                <label className={labelCls}>Catalog (optional)</label>
                <select value={form.catalogKey} onChange={(e) => setForm((f) => ({ ...f, catalogKey: e.target.value }))} className={inputCls}>
                  {CATALOG_OPTIONS.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* Poster URL (for videos) */}
              <div>
                <label className={labelCls}>Video poster URL (optional, for video thumbnails)</label>
                <input
                  value={form.posterUrl}
                  onChange={(e) => setForm((f) => ({ ...f, posterUrl: e.target.value }))}
                  placeholder="https://..."
                  className={inputCls}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/10">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-sm text-white/70 hover:bg-white/10 transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="px-4 py-2 rounded-xl border border-[rgb(var(--blue))]/40 bg-[rgb(var(--blue))]/20 text-sm font-medium text-white hover:bg-[rgb(var(--blue))]/30 transition-colors disabled:opacity-50">
                {uploading ? "Uploading…" : saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
