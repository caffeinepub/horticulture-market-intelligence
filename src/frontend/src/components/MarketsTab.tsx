import { Skeleton } from "@/components/ui/skeleton";
import { Award, MapPin, TrendingUp, Users } from "lucide-react";
import { motion } from "motion/react";
import { type Mandi, useMandisByCrop } from "../hooks/useQueries";
import type { Lang } from "../lib/i18n";
import { t } from "../lib/i18n";
import { MOCK_MANDIS } from "../lib/mockData";

interface Props {
  lang: Lang;
}

const DEMAND_CONFIG = {
  High: {
    label: "High",
    labelHi: "उच्च",
    labelTe: "అధిక",
    colorClass: "bg-severity-surge border-severity-surge text-severity-surge",
    barWidth: "w-full",
  },
  Medium: {
    label: "Medium",
    labelHi: "मध्यम",
    labelTe: "మధ్యమ",
    colorClass:
      "bg-severity-warning border-severity-warning text-severity-warning",
    barWidth: "w-2/3",
  },
  Low: {
    label: "Low",
    labelHi: "कम",
    labelTe: "తక్కువ",
    colorClass:
      "bg-severity-critical border-severity-critical text-severity-critical",
    barWidth: "w-1/3",
  },
};

function MandiCard({
  mandi,
  index,
  lang,
  isBestMatch,
}: {
  mandi: Mandi;
  index: number;
  lang: Lang;
  isBestMatch: boolean;
}) {
  const demand =
    DEMAND_CONFIG[mandi.demandLevel as keyof typeof DEMAND_CONFIG] ??
    DEMAND_CONFIG.Medium;

  const demandLabel =
    lang === "hi"
      ? demand.labelHi
      : lang === "te"
        ? demand.labelTe
        : demand.label;

  const bestMatchLabel = t("bestMatch", lang);
  const distLabel = t("distance", lang);
  const buyersLabel = t("buyers", lang);

  return (
    <motion.div
      data-ocid={`markets.item.${index}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className={`bg-card rounded-2xl shadow-card border overflow-hidden ${
        isBestMatch ? "border-accent" : "border-border"
      }`}
    >
      {isBestMatch && (
        <div className="bg-accent px-4 py-1.5 flex items-center gap-2">
          <Award className="w-3.5 h-3.5 text-accent-foreground" />
          <span className="text-xs font-display font-bold text-accent-foreground">
            {bestMatchLabel}
          </span>
        </div>
      )}

      <div className="p-4">
        {/* Name + zone */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <p className="font-display font-bold text-foreground text-base leading-tight">
              {mandi.name}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-body">
                {mandi.locationZone}
              </span>
            </div>
          </div>
          <span
            className={`inline-flex items-center gap-1 text-xs font-display font-bold px-2.5 py-1 rounded-full border shrink-0 ${demand.colorClass}`}
          >
            <TrendingUp className="w-3 h-3" />
            {demandLabel}
          </span>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-muted rounded-xl p-2.5 text-center">
            <p className="font-display font-extrabold text-xl text-foreground leading-none">
              {mandi.distanceKm}
            </p>
            <p className="text-[10px] text-muted-foreground font-body mt-0.5">
              {distLabel}
            </p>
          </div>
          <div className="bg-muted rounded-xl p-2.5 text-center">
            <div className="flex items-center justify-center gap-1">
              <Users className="w-3.5 h-3.5 text-foreground" />
              <p className="font-display font-extrabold text-xl text-foreground leading-none">
                {mandi.activeBuyers.toString()}
              </p>
            </div>
            <p className="text-[10px] text-muted-foreground font-body mt-0.5">
              {buyersLabel}
            </p>
          </div>
        </div>

        {/* Specializations */}
        <div className="flex flex-wrap gap-1.5">
          {mandi.specializations.map((spec) => (
            <span
              key={spec}
              className="text-xs font-body bg-primary/10 text-primary rounded-full px-2.5 py-1"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function MarketsTab({ lang }: Props) {
  const { data: backendMandis, isLoading } = useMandisByCrop("tomato");

  // Merge backend + mock
  const allMandis: Mandi[] = (() => {
    if (backendMandis && backendMandis.length > 0) {
      const combined = [...backendMandis, ...MOCK_MANDIS];
      const seen = new Set<string>();
      return combined.filter((m) => {
        const k = m.id.toString();
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      });
    }
    return MOCK_MANDIS;
  })();

  // Sort by demand level
  const demandOrder = { High: 0, Medium: 1, Low: 2 };
  const sorted = [...allMandis].sort(
    (a, b) =>
      (demandOrder[a.demandLevel as keyof typeof demandOrder] ?? 3) -
      (demandOrder[b.demandLevel as keyof typeof demandOrder] ?? 3),
  );

  return (
    <div className="flex flex-col gap-4 px-4 pt-4 pb-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-display font-bold text-xl text-foreground">
            {t("markets", lang)}
          </h2>
          <p className="text-xs text-muted-foreground font-body mt-0.5">
            {lang === "hi"
              ? "मांग के अनुसार क्रमबद्ध"
              : lang === "te"
                ? "డిమాండ్ ద్వారా క్రమబద్ధం"
                : "Sorted by demand level"}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-muted rounded-xl px-3 py-2">
          <span className="text-xl">🏪</span>
          <span className="font-display font-bold text-foreground text-sm">
            {sorted.length}
          </span>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-card rounded-2xl p-4 border border-border"
            >
              <Skeleton className="h-5 w-40 mb-2 rounded" />
              <Skeleton className="h-4 w-28 mb-3 rounded" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          ))}
        </div>
      )}

      {/* Mandi list */}
      {!isLoading && (
        <div className="flex flex-col gap-3">
          {sorted.map((mandi, idx) => (
            <MandiCard
              key={mandi.id.toString()}
              mandi={mandi}
              index={idx + 1}
              lang={lang}
              isBestMatch={idx < 3}
            />
          ))}
        </div>
      )}
    </div>
  );
}
