"use client";

import { useState, useTransition } from "react";
import type { TierExamplesConfig } from "@/types/catalog";
import { saveTierExamplesAction } from "@/app/admin/actions";

type Example = {
  id: number;
  titleEn: string;
  mediaType: string;
  mediaUrl: string;
  posterUrl: string | null;
  order: number;
};

const TIER_LABELS = ["Starter (1)", "Business (2)", "Monthly (3)"] as const;
const TIER_KEYS = ["tier1", "tier2", "tier3"] as const;

export function AdminExamplesTierEditor(props: {
  catalogSlug: string;
  examples: Example[];
  tierConfig: TierExamplesConfig;
}) {
  const { catalogSlug, examples } = props;
  const entry = props.tierConfig[catalogSlug] ?? { tier1: [], tier2: [], tier3: [] };

  const [tiers, setTiers] = useState<{ tier1: number[]; tier2: number[]; tier3: number[] }>({
    tier1: entry.tier1 ?? [],
    tier2: entry.tier2 ?? [],
    tier3: entry.tier3 ?? [],
  });
  const [activeTier, setActiveTier] = useState<0 | 1 | 2>(0);
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tierKey = TIER_KEYS[activeTier];
  const assignedIds = new Set([...tiers.tier1, ...tiers.tier2, ...tiers.tier3]);
  const unassigned = examples.filter((e) => !assignedIds.has(e.id));

  function addToTier(exId: number) {
    setTiers((prev) => ({ ...prev, [tierKey]: [...prev[tierKey], exId] }));
    setSaved(false);
  }

  function removeFromTier(exId: number) {
    setTiers((prev) => ({
      ...prev,
      [tierKey]: prev[tierKey].filter((id) => id !== exId),
    }));
    setSaved(false);
  }

  function moveUp(exId: number) {
    setTiers((prev) => {
      const arr = [...prev[tierKey]];
      const idx = arr.indexOf(exId);
      if (idx <= 0) return prev;
      [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
      return { ...prev, [tierKey]: arr };
    });
    setSaved(false);
  }

  function moveDown(exId: number) {
    setTiers((prev) => {
      const arr = [...prev[tierKey]];
      const idx = arr.indexOf(exId);
      if (idx < 0 || idx >= arr.length - 1) return prev;
      [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
      return { ...prev, [tierKey]: arr };
    });
    setSaved(false);
  }

  function save() {
    startTransition(async () => {
      try {
        await saveTierExamplesAction(catalogSlug, JSON.stringify(tiers));
        setSaved(true);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to save");
        setSaved(false);
      }
    });
  }

  const currentIds = tiers[tierKey];

  return (
    <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="text-sm font-medium text-white/90 mb-3">Tier assignments</div>

      {/* Tier tabs */}
      <div className="flex gap-1 mb-4">
        {TIER_LABELS.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setActiveTier(i as 0 | 1 | 2)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTier === i
                ? "bg-[rgb(var(--blue))]/20 border border-[rgb(var(--blue))]/40 text-white"
                : "bg-white/[0.04] border border-white/10 text-white/60 hover:bg-white/[0.08]"
            }`}
          >
            {label} ({tiers[TIER_KEYS[i]].length})
          </button>
        ))}
      </div>

      {/* Assigned examples in current tier */}
      {currentIds.length > 0 && (
        <div className="space-y-1.5 mb-3">
          {currentIds.map((id) => {
            const ex = examples.find((e) => e.id === id);
            if (!ex) return null;
            return (
              <div key={id} className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-3 py-1.5">
                <span className="text-xs text-white/70 truncate flex-1">
                  #{ex.id} {ex.titleEn || "(untitled)"}
                  {ex.mediaType === "VIDEO" && <span className="ml-1 text-white/40">▶</span>}
                </span>
                <button type="button" onClick={() => moveUp(id)} className="text-[10px] text-white/40 hover:text-white/80">↑</button>
                <button type="button" onClick={() => moveDown(id)} className="text-[10px] text-white/40 hover:text-white/80">↓</button>
                <button type="button" onClick={() => removeFromTier(id)} className="text-[10px] text-red-400/70 hover:text-red-400">✕</button>
              </div>
            );
          })}
        </div>
      )}

      {/* Unassigned examples */}
      {unassigned.length > 0 && (
        <div className="mb-3">
          <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Unassigned</div>
          <div className="flex flex-wrap gap-1">
            {unassigned.map((ex) => (
              <button
                key={ex.id}
                type="button"
                onClick={() => addToTier(ex.id)}
                className="rounded-lg border border-dashed border-white/15 bg-white/[0.03] px-2 py-1 text-[11px] text-white/50 hover:bg-white/[0.08] hover:text-white/80 transition-colors"
              >
                + #{ex.id} {ex.titleEn || "(untitled)"}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Save */}
      <button
        type="button"
        disabled={pending}
        onClick={save}
        className="w-full rounded-xl border border-[rgb(var(--blue))]/30 bg-[rgb(var(--blue))]/10 px-4 py-2 text-sm font-medium text-white hover:bg-[rgb(var(--blue))]/20 disabled:opacity-50 transition-all"
      >
        {pending ? "Saving…" : saved ? "Tier assignments saved ✓" : "Save tier assignments"}
      </button>
      {error && (
        <div className="mt-2 text-xs text-red-400">{error}</div>
      )}
    </div>
  );
}
