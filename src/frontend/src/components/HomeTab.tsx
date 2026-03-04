import {
  Bell,
  IndianRupee,
  Lightbulb,
  Phone,
  Settings,
  Store,
  User,
  Volume2,
} from "lucide-react";
import { motion } from "motion/react";
import type { Lang } from "../lib/i18n";
import { t } from "../lib/i18n";

interface Props {
  lang: Lang;
  farmerName: string;
  onNavigate: (tab: string) => void;
}

const IVR_BUTTONS = [
  {
    num: 1,
    key: "prices" as const,
    icon: IndianRupee,
    bg: "from-green-600 to-green-700",
    shadow: "shadow-green-700/30",
    tab: "prices",
    ocid: "home.prices_button",
  },
  {
    num: 2,
    key: "alerts" as const,
    icon: Bell,
    bg: "from-red-500 to-red-600",
    shadow: "shadow-red-600/30",
    tab: "alerts",
    ocid: "home.alerts_button",
  },
  {
    num: 3,
    key: "advisory" as const,
    icon: Lightbulb,
    bg: "from-amber-500 to-amber-600",
    shadow: "shadow-amber-500/30",
    tab: "advisory",
    ocid: "home.advisory_button",
  },
  {
    num: 4,
    key: "markets" as const,
    icon: Store,
    bg: "from-blue-500 to-blue-600",
    shadow: "shadow-blue-600/30",
    tab: "markets",
    ocid: "home.markets_button",
  },
  {
    num: 5,
    key: "profile" as const,
    icon: User,
    bg: "from-purple-500 to-purple-600",
    shadow: "shadow-purple-600/30",
    tab: "profile",
    ocid: "home.profile_button",
  },
  {
    num: 6,
    key: "admin" as const,
    icon: Settings,
    bg: "from-gray-600 to-gray-700",
    shadow: "shadow-gray-700/30",
    tab: "admin",
    ocid: "home.admin_button",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1 },
};

export default function HomeTab({ lang, farmerName, onNavigate }: Props) {
  return (
    <div className="flex flex-col gap-0 pb-4">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-b-3xl">
        <img
          src="/assets/generated/mandi-hero.dim_800x400.jpg"
          alt="Mandi market"
          className="w-full h-44 object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 flex flex-col justify-end p-5 pb-6">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-white/80 text-sm font-body"
          >
            {t("greeting", lang)}
            {farmerName ? `, ${farmerName}` : ""}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-white font-display font-extrabold text-4xl leading-tight"
          >
            {t("welcome", lang)} 🌾
          </motion.h1>
        </div>

        {/* IVR Voice Indicator */}
        <div className="absolute top-3 right-4 flex items-center gap-1.5 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1.5">
          <Volume2 className="w-3.5 h-3.5 text-white" />
          <span className="text-white text-xs font-body font-medium">
            IVR Active
          </span>
        </div>
      </div>

      {/* Service Menu */}
      <div className="px-4 pt-5">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-muted-foreground text-sm font-body mb-4"
        >
          {t("pressMenu", lang)}
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-3"
        >
          {IVR_BUTTONS.map((btn) => {
            const Icon = btn.icon;
            return (
              <motion.button
                key={btn.num}
                variants={itemVariants}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                data-ocid={btn.ocid}
                onClick={() => onNavigate(btn.tab)}
                className={`ivr-btn bg-gradient-to-br ${btn.bg} text-white shadow-ivr ${btn.shadow} relative`}
                whileTap={{ scale: 0.94 }}
              >
                {/* Number badge */}
                <span className="absolute top-2.5 left-3 text-white/60 font-display font-black text-xl leading-none">
                  {btn.num}
                </span>
                <Icon className="w-8 h-8 opacity-90 mt-1" strokeWidth={1.5} />
                <span className="text-sm font-display font-bold leading-tight px-2 text-center">
                  {t(btn.key, lang)}
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* IVR Call Strip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mx-4 mt-4 rounded-2xl bg-primary/10 border border-primary/20 p-4 flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
          <Phone className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <p className="font-display font-bold text-foreground text-sm">
            IVR Helpline: 1800-XXX-XXXX
          </p>
          <p className="text-muted-foreground text-xs font-body">
            {lang === "hi"
              ? "मिस्ड कॉल करें, हम कॉल बैक करेंगे"
              : lang === "te"
                ? "మిస్డ్ కాల్ చేయండి, మేము కాల్ బ్యాక్ చేస్తాం"
                : "Give a missed call, we'll call back free"}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
