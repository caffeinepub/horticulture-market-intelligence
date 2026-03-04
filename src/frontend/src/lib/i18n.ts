export type Lang = "en" | "hi" | "te";

export const LANG_LABELS: Record<Lang, string> = {
  en: "EN",
  hi: "हिं",
  te: "తె",
};

export const LANG_FULL: Record<Lang, string> = {
  en: "English",
  hi: "हिंदी",
  te: "తెలుగు",
};

export const T = {
  welcome: {
    en: "Welcome",
    hi: "स्वागत है",
    te: "స్వాగతం",
  },
  greeting: {
    en: "Good day, Farmer",
    hi: "नमस्ते, किसान भाई",
    te: "నమస్కారం, రైతు సోదరా",
  },
  prices: {
    en: "Prices",
    hi: "मूल्य",
    te: "ధరలు",
  },
  alerts: {
    en: "Alerts",
    hi: "अलर्ट",
    te: "హెచ్చరికలు",
  },
  advisory: {
    en: "Advisory",
    hi: "सलाह",
    te: "సలహా",
  },
  markets: {
    en: "Markets",
    hi: "बाजार",
    te: "మార్కెట్లు",
  },
  profile: {
    en: "Profile",
    hi: "प्रोफ़ाइल",
    te: "ప్రొఫైల్",
  },
  admin: {
    en: "Admin",
    hi: "व्यवस्थापक",
    te: "అడ్మిన్",
  },
  pressMenu: {
    en: "Select a service",
    hi: "सेवा चुनें",
    te: "సేవను ఎంచుకోండి",
  },
  searchCrop: {
    en: "Search crop...",
    hi: "फसल खोजें...",
    te: "పంటను వెతకండి...",
  },
  loading: {
    en: "Loading...",
    hi: "लोड हो रहा है...",
    te: "లోడ్ అవుతోంది...",
  },
  noAlerts: {
    en: "No alerts yet",
    hi: "कोई अलर्ट नहीं",
    te: "అలర్ట్‌లు లేవు",
  },
  noAlertsDesc: {
    en: "You're all clear! New alerts will appear here.",
    hi: "सब ठीक है! नए अलर्ट यहां दिखेंगे।",
    te: "మీకు అన్నీ సరిగ్గా ఉన్నాయి! కొత్త అలర్ట్‌లు ఇక్కడ కనిపిస్తాయి.",
  },
  bestMatch: {
    en: "Best Match",
    hi: "सर्वश्रेष्ठ",
    te: "అత్యుత్తమ",
  },
  distance: {
    en: "km away",
    hi: "कि.मी. दूर",
    te: "కి.మీ. దూరం",
  },
  buyers: {
    en: "buyers",
    hi: "खरीदार",
    te: "కొనుగోలుదారులు",
  },
  saveName: {
    en: "Save Profile",
    hi: "प्रोफ़ाइल सहेजें",
    te: "ప్రొఫైల్ సేవ్ చేయి",
  },
  name: {
    en: "Your Name",
    hi: "आपका नाम",
    te: "మీ పేరు",
  },
  phone: {
    en: "Phone Number",
    hi: "फोन नंबर",
    te: "ఫోన్ నంబర్",
  },
  location: {
    en: "Location Zone",
    hi: "क्षेत्र",
    te: "ప్రాంతం",
  },
  language: {
    en: "Language",
    hi: "भाषा",
    te: "భాష",
  },
  cropsInterest: {
    en: "Crops of Interest",
    hi: "रुचि की फसलें",
    te: "ఆసక్తి ఉన్న పంటలు",
  },
  addMandi: {
    en: "Add Mandi",
    hi: "मंडी जोड़ें",
    te: "మండి జోడించు",
  },
  sendAlert: {
    en: "Send Alert",
    hi: "अलर्ट भेजें",
    te: "అలర్ట్ పంపు",
  },
  mandiName: {
    en: "Mandi Name",
    hi: "मंडी का नाम",
    te: "మండి పేరు",
  },
  addPrice: {
    en: "Add Price Entry",
    hi: "मूल्य जोड़ें",
    te: "ధర జోడించు",
  },
  arrivals: {
    en: "Arrivals",
    hi: "आवक",
    te: "రాకలు",
  },
  quintal: {
    en: "₹/quintal",
    hi: "₹/क्विंटल",
    te: "₹/క్వింటాల్",
  },
  read: {
    en: "Read",
    hi: "पढ़ा",
    te: "చదివారు",
  },
  unread: {
    en: "Unread",
    hi: "अपठित",
    te: "చదవలేదు",
  },
  markRead: {
    en: "Mark Read",
    hi: "पठित करें",
    te: "చదివినట్టు గుర్తించు",
  },
  ago: {
    en: "ago",
    hi: "पहले",
    te: "ముందు",
  },
  high: {
    en: "High",
    hi: "उच्च",
    te: "అధిక",
  },
  medium: {
    en: "Medium",
    hi: "मध्यम",
    te: "మధ్యమ",
  },
  low: {
    en: "Low",
    hi: "कम",
    te: "తక్కువ",
  },
};

export type TKey = keyof typeof T;

export function t(key: TKey, lang: Lang): string {
  return T[key][lang] ?? T[key].en;
}
