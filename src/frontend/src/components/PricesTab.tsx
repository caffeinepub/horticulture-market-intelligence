import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Minus, Search, TrendingDown, TrendingUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Lang } from "../lib/i18n";
import { t } from "../lib/i18n";
import { type CropPrice, MOCK_PRICES } from "../lib/mockData";

interface Props {
  lang: Lang;
}

function TrendIcon({ trend }: { trend: CropPrice["trend"] }) {
  if (trend === "up")
    return <TrendingUp className="w-5 h-5 text-crop-up" strokeWidth={2.5} />;
  if (trend === "down")
    return (
      <TrendingDown className="w-5 h-5 text-crop-down" strokeWidth={2.5} />
    );
  return <Minus className="w-5 h-5 text-crop-stable" strokeWidth={2.5} />;
}

function trendClass(trend: CropPrice["trend"]) {
  if (trend === "up") return "text-crop-up";
  if (trend === "down") return "text-crop-down";
  return "text-crop-stable";
}

function trendBgClass(trend: CropPrice["trend"]) {
  if (trend === "up") return "bg-crop-up border-crop-up";
  if (trend === "down") return "bg-crop-down border-crop-down";
  return "bg-crop-stable border-crop-stable";
}

function pctChange(curr: number, prev: number) {
  const pct = ((curr - prev) / prev) * 100;
  const sign = pct > 0 ? "+" : "";
  return `${sign}${pct.toFixed(1)}%`;
}

function getCropName(crop: CropPrice, lang: Lang) {
  if (lang === "hi") return crop.nameHi;
  if (lang === "te") return crop.nameTe;
  return crop.nameEn;
}

export default function PricesTab({ lang }: Props) {
  const [search, setSearch] = useState("");

  const filtered = MOCK_PRICES.filter((c) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      c.nameEn.toLowerCase().includes(q) ||
      c.nameHi.toLowerCase().includes(q) ||
      c.nameTe.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col gap-4 px-4 pt-4 pb-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          data-ocid="prices.search_input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("searchCrop", lang)}
          className="pl-9 h-12 rounded-xl font-body text-base bg-card border-border"
        />
      </div>

      {/* Live data badge */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs text-muted-foreground font-body">
          {lang === "hi"
            ? "आज के मंडी भाव — लाइव"
            : lang === "te"
              ? "ఈరోజు మండి ధరలు — లైవ్"
              : "Today's Mandi Rates — Live"}
        </span>
      </div>

      {/* Price cards */}
      <div className="flex flex-col gap-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((crop, idx) => (
            <motion.div
              key={crop.id}
              data-ocid={`prices.item.${idx + 1}`}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ delay: idx * 0.05, duration: 0.25 }}
              layout
              className="bg-card rounded-2xl shadow-card border border-border overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  {/* Left: emoji + name + mandi */}
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-3xl shrink-0 leading-none">
                      {crop.emoji}
                    </span>
                    <div className="min-w-0">
                      <p className="font-display font-bold text-foreground text-base leading-tight">
                        {getCropName(crop, lang)}
                      </p>
                      <p className="text-muted-foreground text-xs font-body truncate mt-0.5">
                        {crop.mandiName}
                      </p>
                    </div>
                  </div>

                  {/* Right: price + trend */}
                  <div className="flex flex-col items-end shrink-0 gap-1">
                    <p
                      className={`font-display font-extrabold text-2xl leading-none ${trendClass(crop.trend)}`}
                    >
                      ₹{crop.price.toLocaleString("en-IN")}
                    </p>
                    <p className="text-muted-foreground text-[11px] font-body">
                      {t("quintal", lang)}
                    </p>
                  </div>
                </div>

                {/* Bottom row: arrivals + trend badge */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground font-body">
                    {t("arrivals", lang)}:{" "}
                    {crop.arrivals.toLocaleString("en-IN")} qtl
                  </span>
                  <div
                    className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 border ${trendBgClass(crop.trend)}`}
                  >
                    <TrendIcon trend={crop.trend} />
                    <span
                      className={`text-xs font-display font-bold ${trendClass(crop.trend)}`}
                    >
                      {pctChange(crop.price, crop.prevPrice)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground font-body">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-display font-bold text-base text-foreground">
              No crops found
            </p>
            <p className="text-sm mt-1">
              Try searching in English, Hindi, or Telugu
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
