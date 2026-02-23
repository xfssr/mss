"use client";

import { useState, useEffect, useCallback } from "react";

type CaseStudy = {
  id: string;
  order: number;
  category: string;
  videoUrl: string;
  titleEn: string;
  titleHe: string;
  tagsEn: string;
  tagsHe: string;
  views: string;
  avgWatch: string;
  fullWatch: string;
  followers: string;
  forYou: string | null;
  insightEn: string;
  insightHe: string;
  servicesEn: string;
  servicesHe: string;
  thumbnailUrl: string;
  isPublished: boolean;
};

const CATEGORIES = ["food", "restaurant", "street", "kitchen", "bar"] as const;

const emptyForm = {
  category: "food" as string,
  videoUrl: "",
  titleEn: "",
  titleHe: "",
  tagsEn: "",
  tagsHe: "",
  views: "—",
  avgWatch: "—",
  fullWatch: "—",
  followers: "—",
  forYou: "",
  insightEn: "",
  insightHe: "",
  servicesEn: "",
  servicesHe: "",
  thumbnailUrl: "",
  isPublished: true,
};

export default function AdminCaseStudiesPage() {
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const fetchCases = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/case-studies");
      if (res.ok) setCases(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCases(); }, [fetchCases]);

  function openAdd() {
    setEditId(null);
    setForm({ ...emptyForm });
    setError("");
    setModalOpen(true);
  }

  function openEdit(cs: CaseStudy) {
    setEditId(cs.id);
    setForm({
      category: cs.category,
      videoUrl: cs.videoUrl,
      titleEn: cs.titleEn,
      titleHe: cs.titleHe,
      tagsEn: cs.tagsEn,
      tagsHe: cs.tagsHe,
      views: cs.views,
      avgWatch: cs.avgWatch,
      fullWatch: cs.fullWatch,
      followers: cs.followers,
      forYou: cs.forYou || "",
      insightEn: cs.insightEn,
      insightHe: cs.insightHe,
      servicesEn: cs.servicesEn,
      servicesHe: cs.servicesHe,
      thumbnailUrl: cs.thumbnailUrl,
      isPublished: cs.isPublished,
    });
    setError("");
    setModalOpen(true);
  }

  async function handleSave() {
    if (!form.videoUrl.startsWith("https://www.tiktok.com/")) {
      setError("Video URL must start with https://www.tiktok.com/");
      return;
    }
    if (!form.titleEn || !form.titleHe || !form.category || !form.insightEn || !form.insightHe || !form.servicesEn || !form.servicesHe || !form.tagsEn || !form.tagsHe) {
      setError("Please fill all required fields");
      return;
    }

    setSaving(true);
    setError("");
    try {
      const payload = { ...form, forYou: form.forYou || null };
      const url = editId ? `/api/admin/case-studies/${editId}` : "/api/admin/case-studies";
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Save failed");
      }
      setModalOpen(false);
      fetchCases();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    await fetch(`/api/admin/case-studies/${id}`, { method: "DELETE" });
    setDeleteConfirm(null);
    fetchCases();
  }

  async function handleTogglePublish(cs: CaseStudy) {
    await fetch(`/api/admin/case-studies/${cs.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...cs, isPublished: !cs.isPublished }),
    });
    fetchCases();
  }

  async function handleMove(id: string, direction: "up" | "down") {
    const idx = cases.findIndex((c) => c.id === id);
    if (idx < 0) return;
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= cases.length) return;

    const newOrder = [...cases];
    [newOrder[idx], newOrder[swapIdx]] = [newOrder[swapIdx], newOrder[idx]];
    setCases(newOrder);

    await fetch("/api/admin/case-studies/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderedIds: newOrder.map((c) => c.id) }),
    });
    fetchCases();
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      setError("Only jpg, png, webp allowed");
      return;
    }
    if (file.size > 6 * 1024 * 1024) {
      setError("Max 6MB");
      return;
    }

    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/case-studies/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setForm((f) => ({ ...f, thumbnailUrl: data.url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  const inputCls = "w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-white/25 transition-colors";
  const labelCls = "block text-[11px] text-white/55 mb-1";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f14] via-[#0a0c10] to-[#06070a] text-white" dir="ltr">
      {/* Header - matching admin layout */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/60 backdrop-blur-lg">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-2">
          <a href="/admin" className="font-medium text-sm shrink-0 hover:text-white/80 transition-colors">← Admin</a>
          <h1 className="text-sm font-medium">Case Studies</h1>
          <div className="w-16" />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Title + Add button */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-[rgb(var(--blue))]">Case Studies</h2>
            <p className="text-xs text-white/40 mt-1">Manage case studies shown on the homepage</p>
          </div>
          <button onClick={openAdd} className="rounded-xl border border-[rgb(var(--blue))]/40 bg-[rgb(var(--blue))]/20 px-4 py-2 text-sm font-medium text-white hover:bg-[rgb(var(--blue))]/30 transition-colors">
            + Add Case
          </button>
        </div>

        {/* Loading */}
        {loading && <div className="text-white/50 text-sm py-8 text-center">Loading…</div>}

        {/* List */}
        {!loading && cases.length === 0 && (
          <div className="text-white/40 text-sm py-8 text-center">No case studies yet. Click &quot;+ Add Case&quot; to create one.</div>
        )}

        <div className="space-y-3">
          {cases.map((cs, idx) => (
            <div key={cs.id} className="rounded-2xl border border-white/10 bg-[rgba(11,15,20,0.55)] backdrop-blur-xl p-4 flex items-center gap-4">
              {/* Thumbnail */}
              <div className="w-16 h-16 rounded-lg bg-white/5 overflow-hidden shrink-0">
                {cs.thumbnailUrl ? (
                  <img src={cs.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/20 text-xs">No img</div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white/90 truncate">{cs.titleEn}</div>
                <div className="text-xs text-white/40 mt-0.5">{cs.category} • {cs.views} views</div>
              </div>

              {/* Order */}
              <div className="text-xs text-white/30 shrink-0">#{idx + 1}</div>

              {/* Published toggle */}
              <button
                onClick={() => handleTogglePublish(cs)}
                className={`shrink-0 px-2 py-1 rounded-lg text-xs font-medium border transition-colors ${cs.isPublished ? "border-green-500/30 bg-green-500/10 text-green-400" : "border-white/10 bg-white/5 text-white/40"}`}
              >
                {cs.isPublished ? "Published" : "Draft"}
              </button>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => handleMove(cs.id, "up")} disabled={idx === 0} className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white disabled:opacity-20 transition-colors" title="Move up">↑</button>
                <button onClick={() => handleMove(cs.id, "down")} disabled={idx === cases.length - 1} className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white disabled:opacity-20 transition-colors" title="Move down">↓</button>
                <button onClick={() => openEdit(cs)} className="px-2 py-1 rounded-lg hover:bg-white/10 text-white/50 hover:text-white text-xs transition-colors">Edit</button>
                <button onClick={() => setDeleteConfirm(cs.id)} className="px-2 py-1 rounded-lg hover:bg-red-500/10 text-red-400/50 hover:text-red-400 text-xs transition-colors">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)}>
          <div className="rounded-2xl border border-white/10 bg-[#0b0f14] p-6 max-w-sm w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white">Delete Case Study?</h3>
            <p className="text-sm text-white/50 mt-2">This action cannot be undone.</p>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-sm text-white/70 hover:bg-white/10 transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="px-4 py-2 rounded-xl border border-red-500/30 bg-red-500/20 text-sm text-red-400 hover:bg-red-500/30 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-8" onClick={() => setModalOpen(false)}>
          <div className="rounded-2xl border border-white/10 bg-[#0b0f14] p-6 max-w-lg w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white mb-4">{editId ? "Edit Case Study" : "Add Case Study"}</h3>

            {error && <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">{error}</div>}

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {/* Category */}
              <div>
                <label className={labelCls}>Category *</label>
                <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className={inputCls}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Video URL */}
              <div>
                <label className={labelCls}>Video URL * (must start with https://www.tiktok.com/)</label>
                <input value={form.videoUrl} onChange={(e) => setForm((f) => ({ ...f, videoUrl: e.target.value }))} placeholder="https://www.tiktok.com/..." className={inputCls} />
              </div>

              {/* Titles */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Title EN *</label>
                  <input value={form.titleEn} onChange={(e) => setForm((f) => ({ ...f, titleEn: e.target.value }))} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Title HE *</label>
                  <input value={form.titleHe} onChange={(e) => setForm((f) => ({ ...f, titleHe: e.target.value }))} className={inputCls} dir="rtl" />
                </div>
              </div>

              {/* Tags */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Tags EN *</label>
                  <input value={form.tagsEn} onChange={(e) => setForm((f) => ({ ...f, tagsEn: e.target.value }))} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Tags HE *</label>
                  <input value={form.tagsHe} onChange={(e) => setForm((f) => ({ ...f, tagsHe: e.target.value }))} className={inputCls} dir="rtl" />
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Views</label>
                  <input value={form.views} onChange={(e) => setForm((f) => ({ ...f, views: e.target.value }))} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Avg Watch</label>
                  <input value={form.avgWatch} onChange={(e) => setForm((f) => ({ ...f, avgWatch: e.target.value }))} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Full Watch</label>
                  <input value={form.fullWatch} onChange={(e) => setForm((f) => ({ ...f, fullWatch: e.target.value }))} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Followers</label>
                  <input value={form.followers} onChange={(e) => setForm((f) => ({ ...f, followers: e.target.value }))} className={inputCls} />
                </div>
              </div>

              {/* For You */}
              <div>
                <label className={labelCls}>For You % (optional)</label>
                <input value={form.forYou} onChange={(e) => setForm((f) => ({ ...f, forYou: e.target.value }))} placeholder="e.g. 87.2%" className={inputCls} />
              </div>

              {/* Insights */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Insight EN *</label>
                  <textarea value={form.insightEn} onChange={(e) => setForm((f) => ({ ...f, insightEn: e.target.value }))} rows={2} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Insight HE *</label>
                  <textarea value={form.insightHe} onChange={(e) => setForm((f) => ({ ...f, insightHe: e.target.value }))} rows={2} className={inputCls} dir="rtl" />
                </div>
              </div>

              {/* Services */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Services EN *</label>
                  <input value={form.servicesEn} onChange={(e) => setForm((f) => ({ ...f, servicesEn: e.target.value }))} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Services HE *</label>
                  <input value={form.servicesHe} onChange={(e) => setForm((f) => ({ ...f, servicesHe: e.target.value }))} className={inputCls} dir="rtl" />
                </div>
              </div>

              {/* Thumbnail */}
              <div>
                <label className={labelCls}>Thumbnail (jpg/png/webp, max 6MB)</label>
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleUpload} disabled={uploading} className="block w-full text-sm text-white/50 file:mr-3 file:rounded-lg file:border file:border-white/10 file:bg-white/5 file:px-3 file:py-1.5 file:text-sm file:text-white/70 hover:file:bg-white/10 file:transition-colors" />
                {uploading && <p className="text-xs text-white/40 mt-1">Uploading…</p>}
                {form.thumbnailUrl && (
                  <div className="mt-2 w-24 h-24 rounded-lg overflow-hidden border border-white/10">
                    <img src={form.thumbnailUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Publish */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm((f) => ({ ...f, isPublished: e.target.checked }))} className="rounded border-white/20" />
                <span className="text-sm text-white/70">Published</span>
              </label>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/10">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-sm text-white/70 hover:bg-white/10 transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="px-4 py-2 rounded-xl border border-[rgb(var(--blue))]/40 bg-[rgb(var(--blue))]/20 text-sm font-medium text-white hover:bg-[rgb(var(--blue))]/30 transition-colors disabled:opacity-50">
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
