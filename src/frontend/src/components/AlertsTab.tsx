import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell, BellOff, MessageSquare, Phone, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { type Alert, useAlertsForFarmer } from "../hooks/useQueries";
import type { Lang } from "../lib/i18n";
import { t } from "../lib/i18n";
import { MOCK_ALERTS } from "../lib/mockData";

interface Props {
  lang: Lang;
}

const ALERT_TYPE_CONFIG: Record<
  string,
  { label: string; labelHi: string; labelTe: string; colorClass: string }
> = {
  PriceSpike: {
    label: "Price Spike",
    labelHi: "कीमत उछाल",
    labelTe: "ధర పెరుగుదల",
    colorClass:
      "bg-severity-critical border-severity-critical text-severity-critical",
  },
  PriceDrop: {
    label: "Price Drop",
    labelHi: "कीमत गिरावट",
    labelTe: "ధర తగ్గుదల",
    colorClass:
      "bg-severity-critical border-severity-critical text-severity-critical",
  },
  Shortage: {
    label: "Shortage",
    labelHi: "किल्लत",
    labelTe: "కొరత",
    colorClass:
      "bg-severity-warning border-severity-warning text-severity-warning",
  },
  DemandSurge: {
    label: "Demand Surge",
    labelHi: "मांग वृद्धि",
    labelTe: "డిమాండ్ పెరుగుదల",
    colorClass: "bg-severity-surge border-severity-surge text-severity-surge",
  },
};

const CHANNEL_ICONS: Record<string, React.ReactNode> = {
  SMS: <MessageSquare className="w-3 h-3" />,
  WhatsApp: <Send className="w-3 h-3" />,
  Voice: <Phone className="w-3 h-3" />,
};

function timeAgo(timestamp: bigint, lang: Lang): string {
  const ms = Number(timestamp);
  const diff = Date.now() - ms;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);

  if (lang === "hi") {
    if (minutes < 60) return `${minutes} मिनट ${t("ago", lang)}`;
    return `${hours} घंटे ${t("ago", lang)}`;
  }
  if (lang === "te") {
    if (minutes < 60) return `${minutes} నిమిషాల ${t("ago", lang)}`;
    return `${hours} గంటల ${t("ago", lang)}`;
  }
  if (minutes < 60) return `${minutes}m ${t("ago", lang)}`;
  return `${hours}h ${t("ago", lang)}`;
}

function AlertCard({
  alert,
  index,
  lang,
  isRead,
  onToggleRead,
}: {
  alert: Alert;
  index: number;
  lang: Lang;
  isRead: boolean;
  onToggleRead: (id: bigint) => void;
}) {
  const config = ALERT_TYPE_CONFIG[alert.alertType] ?? {
    label: alert.alertType,
    labelHi: alert.alertType,
    labelTe: alert.alertType,
    colorClass: "bg-severity-info border-severity-info text-severity-info",
  };

  const alertLabel =
    lang === "hi"
      ? config.labelHi
      : lang === "te"
        ? config.labelTe
        : config.label;

  return (
    <motion.div
      data-ocid={`alerts.item.${index}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ delay: index * 0.06 }}
      className={`bg-card rounded-2xl shadow-card border border-border overflow-hidden ${
        isRead ? "opacity-60" : ""
      }`}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 text-xs font-display font-bold px-2.5 py-1 rounded-full border ${config.colorClass}`}
            >
              {alertLabel}
            </span>
            <span className="text-xs text-muted-foreground font-body">
              {timeAgo(alert.timestamp, lang)}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onToggleRead(alert.id)}
            className="shrink-0 p-1.5 rounded-full hover:bg-muted transition-colors"
            title={isRead ? t("unread", lang) : t("markRead", lang)}
          >
            {isRead ? (
              <BellOff className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Bell className="w-4 h-4 text-accent" />
            )}
          </button>
        </div>

        {/* Crop + Mandi */}
        <p className="font-display font-bold text-foreground text-sm mb-1">
          {alert.cropName} · {alert.mandiName}
        </p>

        {/* Message */}
        <p className="text-foreground/80 text-sm font-body leading-relaxed">
          {alert.message}
        </p>

        {/* Channels */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xs text-muted-foreground font-body">
            Sent via:
          </span>
          {alert.channels.map((ch) => (
            <span
              key={ch}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5 font-body"
            >
              {CHANNEL_ICONS[ch] ?? null}
              {ch}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function AlertsTab({ lang }: Props) {
  const { data: backendAlerts, isLoading } = useAlertsForFarmer(BigInt(1));
  const [readIds, setReadIds] = useState<Set<string>>(
    new Set(MOCK_ALERTS.filter((a) => a.isRead).map((a) => a.id.toString())),
  );

  const toggleRead = (id: bigint) => {
    setReadIds((prev) => {
      const next = new Set(prev);
      const key = id.toString();
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  // Merge backend + mock, deduplicate by id
  const allAlerts: Alert[] = (() => {
    if (backendAlerts && backendAlerts.length > 0) {
      const combined = [...backendAlerts, ...MOCK_ALERTS];
      const seen = new Set<string>();
      return combined.filter((a) => {
        const k = a.id.toString();
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      });
    }
    return MOCK_ALERTS;
  })();

  return (
    <div className="flex flex-col gap-4 px-4 pt-4 pb-4">
      {/* Header stats */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-xl text-foreground">
            {t("alerts", lang)}
          </h2>
          <p className="text-xs text-muted-foreground font-body mt-0.5">
            {allAlerts.filter((a) => !readIds.has(a.id.toString())).length}{" "}
            {lang === "hi" ? "अपठित" : lang === "te" ? "చదవలేదు" : "unread"}
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center">
          <Bell className="w-5 h-5 text-destructive" />
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div data-ocid="alerts.loading_state" className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-card rounded-2xl p-4 border border-border"
            >
              <Skeleton className="h-4 w-24 mb-3 rounded-full" />
              <Skeleton className="h-3 w-full mb-2 rounded" />
              <Skeleton className="h-3 w-3/4 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Alert list */}
      {!isLoading && (
        <AnimatePresence mode="popLayout">
          {allAlerts.length === 0 ? (
            <motion.div
              data-ocid="alerts.empty_state"
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <p className="text-5xl mb-4">🔔</p>
              <p className="font-display font-bold text-xl text-foreground">
                {t("noAlerts", lang)}
              </p>
              <p className="text-sm text-muted-foreground font-body mt-2 max-w-xs">
                {t("noAlertsDesc", lang)}
              </p>
            </motion.div>
          ) : (
            allAlerts.map((alert, idx) => (
              <AlertCard
                key={alert.id.toString()}
                alert={alert}
                index={idx + 1}
                lang={lang}
                isRead={readIds.has(alert.id.toString())}
                onToggleRead={toggleRead}
              />
            ))
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
