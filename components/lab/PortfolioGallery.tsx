import type { Catalog } from "@/types/catalog";
import { Card, Button, Grid } from "@/components/lab/LabPrimitives";

type Props = {
  catalogs: Catalog[];
  lang: "he" | "en";
  onPreview: (slug: string) => void;
  cta: string;
  empty: string;
};

function pick(lang: "he" | "en", value: { he: string; en: string }) {
  return value?.[lang] || value.he;
}

export function PortfolioGallery({ catalogs, lang, onPreview, cta, empty }: Props) {
  if (!catalogs.length) {
    return <Card className="p-6 text-sm text-[color:var(--text-muted)]">{empty}</Card>;
  }

  return (
    <Grid className="md:grid-cols-2 xl:grid-cols-3">
      {catalogs.map((catalog) => {
        const first = catalog.examples?.[0];
        const cover = first ? (first.posterUrl || first.mediaUrl) : null;
        return (
          <Card key={catalog.slug} className="overflow-hidden">
            <div className="border-b border-[color:var(--line)] p-5">
              <h3 className="text-lg font-semibold text-[color:var(--text-primary)]">{pick(lang, catalog.title)}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-[color:var(--text-secondary)]">{pick(lang, catalog.shortDescription)}</p>
            </div>
            <div className="p-5">
              {cover ? (
                <img
                  src={cover}
                  alt={pick(lang, catalog.title)}
                  className="h-40 w-full rounded-md border border-[color:var(--line)] object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="grid h-40 w-full place-items-center rounded-md border border-[color:var(--line)] bg-[color:var(--surface-2)] text-xs text-[color:var(--text-muted)]">
                  No preview
                </div>
              )}
              <Button className="mt-4 w-full" onClick={() => onPreview(catalog.slug)}>
                {cta}
              </Button>
            </div>
          </Card>
        );
      })}
    </Grid>
  );
}
