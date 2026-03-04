import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, MapPin, Phone, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Lang } from "../lib/i18n";
import { LANG_FULL, LANG_LABELS, type Lang as LangType, t } from "../lib/i18n";
import { ALL_CROPS, LOCATION_ZONES } from "../lib/mockData";

interface FarmerProfile {
  name: string;
  phone: string;
  locationZone: string;
  language: LangType;
  cropsOfInterest: string[];
}

interface Props {
  lang: Lang;
  profile: FarmerProfile;
  onSave: (profile: FarmerProfile) => void;
}

export default function ProfileTab({ lang, profile, onSave }: Props) {
  const [form, setForm] = useState<FarmerProfile>(profile);
  const [saved, setSaved] = useState(false);

  const toggleCrop = (crop: string) => {
    setForm((prev) => ({
      ...prev,
      cropsOfInterest: prev.cropsOfInterest.includes(crop)
        ? prev.cropsOfInterest.filter((c) => c !== crop)
        : [...prev.cropsOfInterest, crop],
    }));
  };

  const handleSave = () => {
    onSave(form);
    setSaved(true);
    toast.success(
      lang === "hi"
        ? "प्रोफ़ाइल सहेजी गई!"
        : lang === "te"
          ? "ప్రొఫైల్ సేవ్ అయింది!"
          : "Profile saved!",
    );
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col gap-5 px-4 pt-4 pb-4">
      {/* Saved profile card */}
      <AnimatePresence>
        {profile.name && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center gap-4"
          >
            <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-2xl font-display font-black text-primary-foreground shrink-0">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-display font-bold text-foreground text-lg">
                {profile.name}
              </p>
              <p className="text-muted-foreground text-sm font-body">
                {profile.phone}
              </p>
              <p className="text-muted-foreground text-xs font-body">
                {profile.locationZone} · {LANG_FULL[profile.language]}
              </p>
              {profile.cropsOfInterest.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {profile.cropsOfInterest.slice(0, 4).map((c) => (
                    <span
                      key={c}
                      className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5 font-body"
                    >
                      {c}
                    </span>
                  ))}
                  {profile.cropsOfInterest.length > 4 && (
                    <span className="text-xs text-muted-foreground font-body">
                      +{profile.cropsOfInterest.length - 4} more
                    </span>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form */}
      <div className="flex flex-col gap-4">
        <h2 className="font-display font-bold text-xl text-foreground">
          {lang === "hi"
            ? "प्रोफ़ाइल सेटअप"
            : lang === "te"
              ? "ప్రొఫైల్ సెటప్"
              : "Farmer Profile"}
        </h2>

        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="farmer-name"
            className="font-display font-bold text-sm text-foreground flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            {t("name", lang)}
          </Label>
          <Input
            id="farmer-name"
            data-ocid="profile.name_input"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            placeholder={
              lang === "hi"
                ? "अपना नाम लिखें"
                : lang === "te"
                  ? "మీ పేరు రాయండి"
                  : "Enter your name"
            }
            className="h-12 rounded-xl font-body text-base"
            autoComplete="name"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="farmer-phone"
            className="font-display font-bold text-sm text-foreground flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            {t("phone", lang)}
          </Label>
          <Input
            id="farmer-phone"
            data-ocid="profile.phone_input"
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            placeholder="+91 XXXXX XXXXX"
            className="h-12 rounded-xl font-body text-base"
            type="tel"
            autoComplete="tel"
          />
        </div>

        {/* Location Zone */}
        <div className="flex flex-col gap-1.5">
          <Label className="font-display font-bold text-sm text-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {t("location", lang)}
          </Label>
          <Select
            value={form.locationZone}
            onValueChange={(v) => setForm((p) => ({ ...p, locationZone: v }))}
          >
            <SelectTrigger
              data-ocid="profile.location_select"
              className="h-12 rounded-xl font-body text-base"
            >
              <SelectValue
                placeholder={
                  lang === "hi"
                    ? "राज्य चुनें"
                    : lang === "te"
                      ? "రాష్ట్రం ఎంచుకోండి"
                      : "Select state"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {LOCATION_ZONES.map((zone) => (
                <SelectItem key={zone} value={zone}>
                  {zone}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Language preference */}
        <div className="flex flex-col gap-1.5">
          <Label className="font-display font-bold text-sm text-foreground">
            {t("language", lang)}
          </Label>
          <div className="flex gap-2">
            {(["en", "hi", "te"] as LangType[]).map((l) => (
              <button
                type="button"
                key={l}
                onClick={() => setForm((p) => ({ ...p, language: l }))}
                className={`flex-1 h-12 rounded-xl font-display font-bold text-sm transition-all ${
                  form.language === l
                    ? "bg-primary text-primary-foreground shadow-card"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {LANG_LABELS[l]} {l === "en" ? "EN" : l === "hi" ? "हिं" : "తె"}
              </button>
            ))}
          </div>
        </div>

        {/* Crops of interest */}
        <div className="flex flex-col gap-2">
          <Label className="font-display font-bold text-sm text-foreground">
            {t("cropsInterest", lang)}
          </Label>
          <div className="flex flex-wrap gap-2">
            {ALL_CROPS.map((crop) => {
              const selected = form.cropsOfInterest.includes(crop);
              return (
                <button
                  type="button"
                  key={crop}
                  onClick={() => toggleCrop(crop)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-body transition-all ${
                    selected
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "bg-muted text-muted-foreground hover:bg-muted/70"
                  }`}
                >
                  {selected && <Check className="w-3 h-3" />}
                  {crop}
                </button>
              );
            })}
          </div>
        </div>

        {/* Save button */}
        <Button
          data-ocid="profile.save_button"
          onClick={handleSave}
          disabled={!form.name.trim()}
          className={`h-14 rounded-2xl font-display font-bold text-base transition-all ${
            saved ? "bg-green-600 hover:bg-green-600" : ""
          }`}
          size="lg"
        >
          {saved ? (
            <>
              <Check className="w-5 h-5 mr-2" />
              {lang === "hi"
                ? "सहेजा गया!"
                : lang === "te"
                  ? "సేవ్ అయింది!"
                  : "Saved!"}
            </>
          ) : (
            t("saveName", lang)
          )}
        </Button>
      </div>
    </div>
  );
}
