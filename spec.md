# Horticulture Smart Market Intelligence

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Voice-based market information assistant UI (simulating IVR/voice interaction flow)
- Multilingual support interface for Telugu and Hindi (language selection screen)
- Simple press-1/press-2 navigation model for low-literacy users
- Market price dashboard: crop prices, mandi arrivals, demand trends
- Crop advisory section with seasonal guidance
- Crop demand alert system: detect supply shortages, demand surges, mandi spikes
- Market recommendation engine: suggest best markets based on distance and buyer demand
- Alert management: view, dismiss, and filter proactive alerts
- Farmer profile: crop selection, location, preferred language
- Mock SMS/WhatsApp/voice alert notification simulation
- Admin panel: manage crop prices, mandis, advisories, and alert thresholds

### Modify
N/A

### Remove
N/A

## Implementation Plan

### Backend (Motoko)
1. Farmer profile store: id, name, phone, location, preferred language (Telugu/Hindi/English), crops of interest
2. Crop price records: crop name, mandi name, price (per quintal), arrival volume, date, trend (up/down/stable)
3. Mandi/market store: name, location, distance zones, active buyers, specializations
4. Crop advisory store: crop, season, advisory text (Telugu, Hindi, English), severity
5. Alert store: farmer id, alert type (price spike, shortage, demand surge), crop, mandi, message, timestamp, read status
6. Market recommendation logic: given crop + farmer location zone, return ranked mandis
7. Admin APIs: add/update crop prices, mandis, advisories, set alert thresholds
8. Alert detection logic: compare latest arrival vs threshold to flag spikes/shortages

### Frontend
1. Language selection screen (Telugu / Hindi / English) as onboarding
2. IVR-style home screen with large buttons: "1 - Prices", "2 - Alerts", "3 - Advisories", "4 - Markets", "5 - Profile"
3. Price page: list crops with current price, trend arrow, mandi name, arrival volume
4. Alerts page: list of proactive alerts with crop, mandi, severity badge, timestamp
5. Advisory page: crop-specific guidance cards with season and severity
6. Market recommendation page: ranked mandis with distance, demand level, buyer count
7. Farmer profile setup: name, phone, location zone, language preference, crops of interest
8. Admin panel (separate route): manage prices, mandis, advisories, alert thresholds
9. Simulated alert send panel: preview SMS/WhatsApp/voice message content
10. All UI text rendered in selected language (Telugu/Hindi/English)
