import { Toaster } from "@/components/ui/sonner";
import { Bell, Home, IndianRupee, Lightbulb, Store, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import AdminTab from "./components/AdminTab";
import AdvisoryTab from "./components/AdvisoryTab";
import AlertsTab from "./components/AlertsTab";
import HomeTab from "./components/HomeTab";
import MarketsTab from "./components/MarketsTab";
import PricesTab from "./components/PricesTab";
import ProfileTab from "./components/ProfileTab";
import type { Lang } from "./lib/i18n";
import { LANG_LABELS } from "./lib/i18n";

type TabId =
  | "home"
  | "prices"
  | "alerts"
  | "advisory"
  | "markets"
  | "profile"
  | "admin";

interface FarmerProfile {
  name: string;
  phone: string;
  locationZone: string;
  language: Lang;
  cropsOfInterest: string[];
}

const DEFAULT_PROFILE: FarmerProfile = {
  name: "",
  phone: "",
  locationZone: "Telangana",
  language: "en",
  cropsOfInterest: ["Tomato", "Chilli"],
};

const NAV_TABS: {
  id: TabId;
  labelEn: string;
  labelHi: string;
  labelTe: string;
  icon: React.ElementType;
  ocid: string;
}[] = [
  {
    id: "home",
    labelEn: "Home",
    labelHi: "होम",
    labelTe: "హోమ్",
    icon: Home,
    ocid: "nav.home_tab",
  },
  {
    id: "prices",
    labelEn: "Prices",
    labelHi: "मूल्य",
    labelTe: "ధరలు",
    icon: IndianRupee,
    ocid: "nav.prices_tab",
  },
  {
    id: "alerts",
    labelEn: "Alerts",
    labelHi: "अलर्ट",
    labelTe: "హెచ్చరిక",
    icon: Bell,
    ocid: "nav.alerts_tab",
  },
  {
    id: "advisory",
    labelEn: "Advisory",
    labelHi: "सलाह",
    labelTe: "సలహా",
    icon: Lightbulb,
    ocid: "nav.advisory_tab",
  },
  {
    id: "markets",
    labelEn: "Markets",
    labelHi: "बाजार",
    labelTe: "మార్కెట్",
    icon: Store,
    ocid: "nav.markets_tab",
  },
  {
    id: "profile",
    labelEn: "Profile",
    labelHi: "प्रोफाइल",
    labelTe: "ప్రొఫైల్",
    icon: User,
    ocid: "nav.profile_tab",
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [lang, setLang] = useState<Lang>("en");
  const [profile, setProfile] = useState<FarmerProfile>(DEFAULT_PROFILE);

  const handleNavigate = useCallback((tab: string) => {
    setActiveTab(tab as TabId);
  }, []);

  const handleSaveProfile = useCallback(
    (newProfile: FarmerProfile) => {
      setProfile(newProfile);
      if (newProfile.language !== lang) {
        setLang(newProfile.language);
      }
    },
    [lang],
  );

  const getTabLabel = (tab: (typeof NAV_TABS)[0]) => {
    if (lang === "hi") return tab.labelHi;
    if (lang === "te") return tab.labelTe;
    return tab.labelEn;
  };

  return (
    <div className="min-h-dvh bg-background flex justify-center">
      {/* Mobile shell */}
      <div className="w-full max-w-[430px] relative flex flex-col min-h-dvh bg-background">
        {/* Top App Bar */}
        <header className="sticky top-0 z-40 bg-nav border-b border-white/10 px-4 py-2.5 flex items-center justify-between shrink-0">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="text-xl">🌾</span>
            <div>
              <p className="font-display font-extrabold text-white text-sm leading-tight">
                HarvestIQ
              </p>
              <p className="font-body text-white/60 text-[10px] leading-tight">
                {lang === "hi"
                  ? "कृषि बाजार बुद्धिमत्ता"
                  : lang === "te"
                    ? "వ్యవసాయ మార్కెట్ సమాచారం"
                    : "Horticulture Market Intelligence"}
              </p>
            </div>
          </div>

          {/* Language toggles */}
          <div className="flex items-center gap-1 bg-white/10 rounded-full p-1">
            {(["en", "hi", "te"] as Lang[]).map((l) => (
              <button
                type="button"
                key={l}
                data-ocid={
                  l === "en"
                    ? "lang.english_button"
                    : l === "hi"
                      ? "lang.hindi_button"
                      : "lang.telugu_button"
                }
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 rounded-full text-xs font-display font-bold transition-all ${
                  lang === l
                    ? "bg-nav-active text-foreground"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {LANG_LABELS[l]}
              </button>
            ))}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto" id="main-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="min-h-full"
            >
              {activeTab === "home" && (
                <HomeTab
                  lang={lang}
                  farmerName={profile.name}
                  onNavigate={handleNavigate}
                />
              )}
              {activeTab === "prices" && <PricesTab lang={lang} />}
              {activeTab === "alerts" && <AlertsTab lang={lang} />}
              {activeTab === "advisory" && <AdvisoryTab lang={lang} />}
              {activeTab === "markets" && <MarketsTab lang={lang} />}
              {activeTab === "profile" && (
                <ProfileTab
                  lang={lang}
                  profile={profile}
                  onSave={handleSaveProfile}
                />
              )}
              {activeTab === "admin" && <AdminTab lang={lang} />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="shrink-0 px-4 py-2 text-center border-t border-border">
          <p className="text-[10px] text-muted-foreground font-body">
            © {new Date().getFullYear()}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Built with ♥ using caffeine.ai
            </a>
          </p>
        </footer>

        {/* Bottom Navigation */}
        <nav
          aria-label="Main navigation"
          className="sticky bottom-0 z-40 bg-nav shadow-nav border-t border-white/10 shrink-0"
        >
          <div className="flex items-stretch">
            {NAV_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  type="button"
                  key={tab.id}
                  data-ocid={tab.ocid}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2 px-1 min-h-[56px] transition-all ${
                    isActive
                      ? "text-nav-active"
                      : "text-white/50 hover:text-white/80"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <div className="relative">
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -inset-1.5 rounded-xl bg-nav-active/20"
                      />
                    )}
                    <Icon
                      className={`w-5 h-5 relative z-10 transition-transform ${
                        isActive ? "scale-110" : "scale-100"
                      }`}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                  </div>
                  <span className="text-[9px] font-display font-bold leading-tight text-nav">
                    {getTabLabel(tab)}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      <Toaster
        position="top-center"
        toastOptions={{
          classNames: {
            toast:
              "font-body text-sm rounded-2xl border border-border shadow-card",
          },
        }}
      />
    </div>
  );
}
