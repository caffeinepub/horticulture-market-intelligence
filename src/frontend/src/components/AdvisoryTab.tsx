import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Lang } from "../lib/i18n";
import { type Advisory, MOCK_ADVISORIES } from "../lib/mockData";

interface Props {
  lang: Lang;
}

const SEVERITY_CONFIG = {
  critical: {
    label: "Critical",
    labelHi: "गंभीर",
    labelTe: "విషమం",
    colorClass:
      "bg-severity-critical border-severity-critical text-severity-critical",
    dotClass: "bg-red-500",
  },
  warning: {
    label: "Warning",
    labelHi: "चेतावनी",
    labelTe: "హెచ్చరిక",
    colorClass:
      "bg-severity-warning border-severity-warning text-severity-warning",
    dotClass: "bg-amber-500",
  },
  info: {
    label: "Info",
    labelHi: "जानकारी",
    labelTe: "సమాచారం",
    colorClass: "bg-severity-info border-severity-info text-severity-info",
    dotClass: "bg-blue-500",
  },
};

function AdvisoryCard({
  advisory,
  lang,
}: {
  advisory: Advisory;
  lang: Lang;
}) {
  const [expanded, setExpanded] = useState(false);
  const sev = SEVERITY_CONFIG[advisory.severity];

  const cropName =
    lang === "hi"
      ? advisory.cropHi
      : lang === "te"
        ? advisory.cropTe
        : advisory.cropEn;

  const title =
    lang === "hi"
      ? advisory.titleHi
      : lang === "te"
        ? advisory.titleTe
        : advisory.titleEn;

  const text =
    lang === "hi"
      ? advisory.textHi
      : lang === "te"
        ? advisory.textTe
        : advisory.textEn;

  const sevLabel =
    lang === "hi" ? sev.labelHi : lang === "te" ? sev.labelTe : sev.label;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl shadow-card border border-border overflow-hidden"
    >
      <button
        type="button"
        className="w-full text-left p-4"
        onClick={() => setExpanded((v) => !v)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-3xl shrink-0 leading-none">
              {advisory.emoji}
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span
                  className={`inline-flex items-center gap-1 text-xs font-display font-bold px-2 py-0.5 rounded-full border ${sev.colorClass}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${sev.dotClass}`}
                  />
                  {sevLabel}
                </span>
                <span className="text-xs text-muted-foreground font-body">
                  {advisory.dateLabel}
                </span>
              </div>
              <p className="font-display font-bold text-foreground text-sm leading-tight">
                {cropName}: {title}
              </p>
            </div>
          </div>
          <span className="shrink-0 text-muted-foreground mt-1">
            {expanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </span>
        </div>

        {/* Collapsed preview */}
        {!expanded && (
          <p className="text-muted-foreground text-xs font-body line-clamp-1 mt-2 ml-[52px]">
            {text}
          </p>
        )}
      </button>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="px-4 pb-4"
        >
          <div className="ml-[52px] border-t border-border pt-3">
            <p className="text-foreground/85 text-sm font-body leading-relaxed">
              {text}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function AdvisoryTab({ lang }: Props) {
  const criticalCount = MOCK_ADVISORIES.filter(
    (a) => a.severity === "critical",
  ).length;

  return (
    <div className="flex flex-col gap-4 px-4 pt-4 pb-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-display font-bold text-xl text-foreground">
            {lang === "hi"
              ? "फसल सलाह"
              : lang === "te"
                ? "పంట సలహా"
                : "Crop Advisory"}
          </h2>
          <p className="text-xs text-muted-foreground font-body mt-0.5">
            {lang === "hi"
              ? `${criticalCount} गंभीर अपडेट`
              : lang === "te"
                ? `${criticalCount} విషమ అప్‌డేట్‌లు`
                : `${criticalCount} critical updates`}
          </p>
        </div>
        <div className="flex gap-2">
          {(["critical", "warning", "info"] as const).map((sev) => {
            const conf = SEVERITY_CONFIG[sev];
            const count = MOCK_ADVISORIES.filter(
              (a) => a.severity === sev,
            ).length;
            return (
              <div
                key={sev}
                className={`flex flex-col items-center px-2 py-1.5 rounded-xl border ${conf.colorClass}`}
              >
                <span className="font-display font-black text-base leading-none">
                  {count}
                </span>
                <span className="text-[10px] font-body mt-0.5 capitalize">
                  {conf.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-3">
        {MOCK_ADVISORIES.map((advisory) => (
          <AdvisoryCard key={advisory.id} advisory={advisory} lang={lang} />
        ))}
      </div>
    </div>
  );
}
