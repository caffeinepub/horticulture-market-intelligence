import type { Alert, Mandi } from "../hooks/useQueries";

export type Trend = "up" | "down" | "stable";

export interface CropPrice {
  id: number;
  emoji: string;
  nameEn: string;
  nameHi: string;
  nameTe: string;
  price: number;
  prevPrice: number;
  trend: Trend;
  mandiName: string;
  arrivals: number; // quintals
  unit: string;
}

export const MOCK_PRICES: CropPrice[] = [
  {
    id: 1,
    emoji: "🍅",
    nameEn: "Tomato",
    nameHi: "टमाटर",
    nameTe: "టమాటా",
    price: 2400,
    prevPrice: 1900,
    trend: "up",
    mandiName: "Kurnool Mandi",
    arrivals: 1240,
    unit: "quintal",
  },
  {
    id: 2,
    emoji: "🧅",
    nameEn: "Onion",
    nameHi: "प्याज",
    nameTe: "ఉల్లిపాయ",
    price: 1800,
    prevPrice: 2200,
    trend: "down",
    mandiName: "Lasalgaon Mandi",
    arrivals: 3200,
    unit: "quintal",
  },
  {
    id: 3,
    emoji: "🥔",
    nameEn: "Potato",
    nameHi: "आलू",
    nameTe: "బంగాళదుంప",
    price: 1200,
    prevPrice: 1180,
    trend: "stable",
    mandiName: "Agra Mandi",
    arrivals: 4500,
    unit: "quintal",
  },
  {
    id: 4,
    emoji: "🌶️",
    nameEn: "Chilli",
    nameHi: "मिर्च",
    nameTe: "మిరపకాయ",
    price: 8500,
    prevPrice: 6800,
    trend: "up",
    mandiName: "Guntur Mandi",
    arrivals: 890,
    unit: "quintal",
  },
  {
    id: 5,
    emoji: "🍆",
    nameEn: "Brinjal",
    nameHi: "बैंगन",
    nameTe: "వంకాయ",
    price: 1100,
    prevPrice: 1400,
    trend: "down",
    mandiName: "Madanapalle Mandi",
    arrivals: 620,
    unit: "quintal",
  },
  {
    id: 6,
    emoji: "🍌",
    nameEn: "Banana",
    nameHi: "केला",
    nameTe: "అరటిపండు",
    price: 3200,
    prevPrice: 2800,
    trend: "up",
    mandiName: "Jalgaon Mandi",
    arrivals: 2100,
    unit: "quintal",
  },
  {
    id: 7,
    emoji: "🥭",
    nameEn: "Mango",
    nameHi: "आम",
    nameTe: "మామిడి",
    price: 5500,
    prevPrice: 4800,
    trend: "up",
    mandiName: "Ratnagiri Mandi",
    arrivals: 760,
    unit: "quintal",
  },
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: BigInt(1),
    alertType: "PriceSpike",
    farmerId: BigInt(1),
    isRead: false,
    channels: ["SMS", "WhatsApp", "Voice"],
    message:
      "Tomato prices surged 26% at Kurnool Mandi. Current: ₹2,400/quintal. Best time to sell!",
    timestamp: BigInt(Date.now() - 1000 * 60 * 15),
    cropName: "Tomato",
    mandiName: "Kurnool Mandi",
  },
  {
    id: BigInt(2),
    alertType: "Shortage",
    farmerId: BigInt(1),
    isRead: false,
    channels: ["SMS", "WhatsApp"],
    message:
      "Chilli shortage detected at Guntur Mandi. Arrivals down 40%. Prices expected to rise further.",
    timestamp: BigInt(Date.now() - 1000 * 60 * 45),
    cropName: "Chilli",
    mandiName: "Guntur Mandi",
  },
  {
    id: BigInt(3),
    alertType: "PriceDrop",
    farmerId: BigInt(1),
    isRead: true,
    channels: ["SMS"],
    message:
      "Onion prices dropped 18% at Lasalgaon Mandi. Consider holding stock for 3-5 days.",
    timestamp: BigInt(Date.now() - 1000 * 60 * 120),
    cropName: "Onion",
    mandiName: "Lasalgaon Mandi",
  },
  {
    id: BigInt(4),
    alertType: "DemandSurge",
    farmerId: BigInt(1),
    isRead: false,
    channels: ["Voice", "WhatsApp"],
    message:
      "High demand for Brinjal from Hyderabad processors. 15 buyers active. Rush to Madanapalle Mandi.",
    timestamp: BigInt(Date.now() - 1000 * 60 * 200),
    cropName: "Brinjal",
    mandiName: "Madanapalle Mandi",
  },
  {
    id: BigInt(5),
    alertType: "PriceSpike",
    farmerId: BigInt(1),
    isRead: true,
    channels: ["SMS", "Voice"],
    message:
      "Mango prices at ₹5,500/quintal at Ratnagiri Mandi — 15% above last week. Good selling window.",
    timestamp: BigInt(Date.now() - 1000 * 60 * 360),
    cropName: "Mango",
    mandiName: "Ratnagiri Mandi",
  },
];

export const MOCK_MANDIS: Mandi[] = [
  {
    id: BigInt(1),
    name: "Kurnool APMC Mandi",
    locationZone: "Andhra Pradesh",
    distanceKm: 45,
    activeBuyers: BigInt(34),
    specializations: ["Tomato", "Chilli", "Onion"],
    demandLevel: "High",
  },
  {
    id: BigInt(2),
    name: "Guntur Mirchi Yard",
    locationZone: "Andhra Pradesh",
    distanceKm: 72,
    activeBuyers: BigInt(28),
    specializations: ["Chilli", "Tomato", "Brinjal"],
    demandLevel: "High",
  },
  {
    id: BigInt(3),
    name: "Hyderabad Bowenpally",
    locationZone: "Telangana",
    distanceKm: 110,
    activeBuyers: BigInt(52),
    specializations: ["All Vegetables", "Fruits", "Leafy Greens"],
    demandLevel: "High",
  },
  {
    id: BigInt(4),
    name: "Madanapalle Mandi",
    locationZone: "Andhra Pradesh",
    distanceKm: 88,
    activeBuyers: BigInt(19),
    specializations: ["Tomato", "Brinjal", "Capsicum"],
    demandLevel: "Medium",
  },
  {
    id: BigInt(5),
    name: "Nizamabad Turmeric Yard",
    locationZone: "Telangana",
    distanceKm: 145,
    activeBuyers: BigInt(14),
    specializations: ["Turmeric", "Onion", "Maize"],
    demandLevel: "Medium",
  },
  {
    id: BigInt(6),
    name: "Kolhapur APMC",
    locationZone: "Maharashtra",
    distanceKm: 320,
    activeBuyers: BigInt(8),
    specializations: ["Onion", "Potato", "Ginger"],
    demandLevel: "Low",
  },
];

export interface Advisory {
  id: number;
  emoji: string;
  cropEn: string;
  cropHi: string;
  cropTe: string;
  titleEn: string;
  titleHi: string;
  titleTe: string;
  textEn: string;
  textHi: string;
  textTe: string;
  severity: "info" | "warning" | "critical";
  dateLabel: string;
}

export const MOCK_ADVISORIES: Advisory[] = [
  {
    id: 1,
    emoji: "🍅",
    cropEn: "Tomato",
    cropHi: "टमाटर",
    cropTe: "టమాటా",
    titleEn: "Early Blight Warning",
    titleHi: "अर्ली ब्लाइट चेतावनी",
    titleTe: "ఎర్లీ బ్లైట్ హెచ్చరిక",
    textEn:
      "Yellow-brown spots detected on tomato leaves in Kurnool district. Apply Mancozeb 75% WP @ 2g/litre. Avoid overhead irrigation.",
    textHi:
      "कुर्नूल जिले में टमाटर की पत्तियों पर पीले-भूरे धब्बे मिले हैं। मैन्कोजेब 75% WP 2g/लीटर पानी में मिलाकर छिड़काव करें। ऊपरी सिंचाई से बचें।",
    textTe:
      "కర్నూల్ జిల్లాలో టమాటా ఆకులపై పసుపు-గోధుమ మచ్చలు కనిపించాయి. మాంకోజెబ్ 75% WP 2g/లీటర్ నీటిలో కలిపి పిచికారీ చేయండి.",
    severity: "critical",
    dateLabel: "Today",
  },
  {
    id: 2,
    emoji: "🧅",
    cropEn: "Onion",
    cropHi: "प्याज",
    cropTe: "ఉల్లిపాయ",
    titleEn: "Storage Advisory",
    titleHi: "भंडारण सलाह",
    titleTe: "నిల్వ సలహా",
    textEn:
      "Prices expected to recover in 2-3 weeks. Store in well-ventilated shade. Check for neck rot. Do not sell below ₹1,500/quintal this week.",
    textHi:
      "2-3 सप्ताह में कीमतें सुधरने की उम्मीद है। हवादार छाया में रखें। गर्दन सड़न की जांच करें। इस सप्ताह ₹1,500/क्विंटल से कम पर न बेचें।",
    textTe:
      "2-3 వారాల్లో ధరలు మెరుగుపడతాయని అంచనా. గాలి వచ్చే నీడలో నిల్వ చేయండి. ₹1,500/క్వింటాల్ కంటే తక్కువకు ఈ వారం అమ్మవద్దు.",
    severity: "warning",
    dateLabel: "Yesterday",
  },
  {
    id: 3,
    emoji: "🌶️",
    cropEn: "Chilli",
    cropHi: "मिर्च",
    cropTe: "మిరపకాయ",
    titleEn: "Thrips Pest Alert",
    titleHi: "थ्रिप्स कीट चेतावनी",
    titleTe: "థ్రిప్స్ పురుగు హెచ్చరిక",
    textEn:
      "Thrips infestation rising in Guntur belt. Use blue sticky traps. Apply Spinosad 45% SC @ 0.3 ml/litre. Harvest mature crop immediately.",
    textHi:
      "गुंटूर क्षेत्र में थ्रिप्स का प्रकोप बढ़ रहा है। नीले चिपचिपे जाल लगाएं। स्पिनोसैड 45% SC 0.3 ml/लीटर से छिड़काव करें।",
    textTe:
      "గుంటూర్ బెల్ట్‌లో థ్రిప్స్ సోకు పెరుగుతోంది. నీలి అంటుకునే వలలు వాడండి. పక్వమైన పంటను వెంటనే కోయండి.",
    severity: "critical",
    dateLabel: "2 days ago",
  },
  {
    id: 4,
    emoji: "🍌",
    cropEn: "Banana",
    cropHi: "केला",
    cropTe: "అరటిపండు",
    titleEn: "Flood Risk Notice",
    titleHi: "बाढ़ जोखिम सूचना",
    titleTe: "వరద ప్రమాద నోటీసు",
    textEn:
      "Low-lying banana farms near Krishna river at risk. Harvest bunches above 80% maturity now. Divert water channels to protect root system.",
    textHi:
      "कृष्णा नदी के पास नीचे की भूमि पर केले के खेतों को खतरा है। 80% से अधिक पके गुच्छों की कटाई अभी करें। सिंचाई नालियों को मोड़ें।",
    textTe:
      "కృష్ణా నది పక్కన పల్లపు అరటి తోటలు ప్రమాదంలో ఉన్నాయి. 80% పరిపక్వత పైన ఉన్న గెలలను ఇప్పుడే కోయండి.",
    severity: "warning",
    dateLabel: "3 days ago",
  },
  {
    id: 5,
    emoji: "🥭",
    cropEn: "Mango",
    cropHi: "आम",
    cropTe: "మామిడి",
    titleEn: "Market Opportunity",
    titleHi: "बाजार का मौका",
    titleTe: "మార్కెట్ అవకాశం",
    textEn:
      "Alphonso mango export demand surging from Middle East. Grade A mangoes fetching ₹6,000+/quintal. Contact Ratnagiri Mandi exporters.",
    textHi:
      "मध्य पूर्व से अल्फांसो आम की निर्यात मांग बढ़ रही है। ग्रेड A आम ₹6,000+ प्रति क्विंटल मिल रहे हैं।",
    textTe:
      "మధ్యప్రాచ్యం నుండి అల్ఫాన్సో మామిడి ఎగుమతి డిమాండ్ పెరుగుతోంది. గ్రేడ్ A మామిడులు ₹6,000+/క్వింటాల్ పొందుతున్నాయి.",
    severity: "info",
    dateLabel: "4 days ago",
  },
];

export const LOCATION_ZONES = [
  "Telangana",
  "Andhra Pradesh",
  "Maharashtra",
  "Karnataka",
  "Tamil Nadu",
  "Madhya Pradesh",
];

export const ALL_CROPS = [
  "Tomato",
  "Onion",
  "Potato",
  "Chilli",
  "Brinjal",
  "Banana",
  "Mango",
  "Turmeric",
  "Ginger",
  "Capsicum",
];
