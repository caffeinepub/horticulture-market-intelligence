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
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Loader2,
  PlusCircle,
  Send,
  Settings,
  Store,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useAddAlert, useAddMandi } from "../hooks/useQueries";
import type { Lang } from "../lib/i18n";
import { t } from "../lib/i18n";
import { ALL_CROPS, LOCATION_ZONES } from "../lib/mockData";

interface Props {
  lang: Lang;
}

type Section = "price" | "mandi" | "alert";

export default function AdminTab({ lang }: Props) {
  const [openSection, setOpenSection] = useState<Section | null>("price");

  // Price form state
  const [priceForm, setPriceForm] = useState({
    crop: "",
    mandi: "",
    price: "",
    volume: "",
    trend: "stable",
  });
  const [priceSuccess, setPriceSuccess] = useState(false);

  // Mandi form state
  const [mandiForm, setMandiForm] = useState({
    name: "",
    locationZone: "",
    distanceKm: "",
    activeBuyers: "",
    specializations: "",
    demandLevel: "Medium",
  });
  const addMandiMutation = useAddMandi();

  // Alert dispatch form state
  const [alertForm, setAlertForm] = useState({
    farmerId: "1",
    alertType: "PriceSpike",
    cropName: "",
    mandiName: "",
    message: "",
    channels: ["SMS", "WhatsApp"],
  });
  const addAlertMutation = useAddAlert();

  const toggleSection = (section: Section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const handleAddPrice = () => {
    if (!priceForm.crop || !priceForm.mandi || !priceForm.price) {
      toast.error(
        lang === "hi" ? "सभी फ़ील्ड भरें" : "Please fill all required fields",
      );
      return;
    }
    setPriceSuccess(true);
    toast.success(
      lang === "hi"
        ? "मूल्य जोड़ा गया!"
        : lang === "te"
          ? "ధర జోడించబడింది!"
          : "Price entry added!",
    );
    setPriceForm({
      crop: "",
      mandi: "",
      price: "",
      volume: "",
      trend: "stable",
    });
    setTimeout(() => setPriceSuccess(false), 3000);
  };

  const handleAddMandi = async () => {
    if (!mandiForm.name || !mandiForm.locationZone) {
      toast.error("Please fill required fields");
      return;
    }
    try {
      await addMandiMutation.mutateAsync({
        name: mandiForm.name,
        locationZone: mandiForm.locationZone,
        distanceKm: Number.parseFloat(mandiForm.distanceKm) || 0,
        activeBuyers: BigInt(Number.parseInt(mandiForm.activeBuyers) || 0),
        specializations: mandiForm.specializations
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        demandLevel: mandiForm.demandLevel,
      });
      toast.success(
        lang === "hi"
          ? "मंडी जोड़ी गई!"
          : lang === "te"
            ? "మండి జోడించబడింది!"
            : "Mandi added successfully!",
      );
      setMandiForm({
        name: "",
        locationZone: "",
        distanceKm: "",
        activeBuyers: "",
        specializations: "",
        demandLevel: "Medium",
      });
    } catch {
      toast.error("Failed to add mandi. Please try again.");
    }
  };

  const toggleChannel = (ch: string) => {
    setAlertForm((prev) => ({
      ...prev,
      channels: prev.channels.includes(ch)
        ? prev.channels.filter((c) => c !== ch)
        : [...prev.channels, ch],
    }));
  };

  const handleSendAlert = async () => {
    if (!alertForm.cropName || !alertForm.mandiName || !alertForm.message) {
      toast.error("Please fill all required fields");
      return;
    }
    try {
      await addAlertMutation.mutateAsync({
        farmerId: BigInt(Number.parseInt(alertForm.farmerId) || 1),
        alertType: alertForm.alertType,
        cropName: alertForm.cropName,
        mandiName: alertForm.mandiName,
        message: alertForm.message,
        channels: alertForm.channels,
      });
      toast.success(
        lang === "hi"
          ? "अलर्ट भेजा गया!"
          : lang === "te"
            ? "అలర్ట్ పంపబడింది!"
            : "Alert dispatched successfully!",
      );
      setAlertForm((prev) => ({
        ...prev,
        cropName: "",
        mandiName: "",
        message: "",
      }));
    } catch {
      toast.error("Failed to send alert. Please try again.");
    }
  };

  const sectionClasses = (active: boolean) =>
    `w-full flex items-center justify-between p-4 text-left transition-colors ${
      active ? "bg-primary text-primary-foreground" : "bg-card hover:bg-muted"
    }`;

  return (
    <div className="flex flex-col gap-4 px-4 pt-4 pb-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
          <Settings className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="font-display font-bold text-xl text-foreground">
            {t("admin", lang)}
          </h2>
          <p className="text-xs text-muted-foreground font-body">
            {lang === "hi"
              ? "मूल्य, मंडी और अलर्ट प्रबंधन"
              : lang === "te"
                ? "ధర, మండి మరియు అలర్ట్ నిర్వహణ"
                : "Price, Mandi & Alert Management"}
          </p>
        </div>
      </div>

      {/* ── Price Management ─────────────────────────── */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-card">
        <button
          type="button"
          className={`${sectionClasses(openSection === "price")} rounded-t-2xl`}
          onClick={() => toggleSection("price")}
        >
          <div className="flex items-center gap-3">
            <PlusCircle className="w-5 h-5" />
            <span className="font-display font-bold text-base">
              {t("addPrice", lang)}
            </span>
          </div>
          {openSection === "price" ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        <AnimatePresence>
          {openSection === "price" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="p-4 flex flex-col gap-3 border-t border-border">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label className="font-display font-bold text-xs text-foreground">
                      Crop Name *
                    </Label>
                    <Select
                      value={priceForm.crop}
                      onValueChange={(v) =>
                        setPriceForm((p) => ({ ...p, crop: v }))
                      }
                    >
                      <SelectTrigger className="h-11 rounded-xl font-body text-sm">
                        <SelectValue placeholder="Select crop" />
                      </SelectTrigger>
                      <SelectContent>
                        {ALL_CROPS.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="font-display font-bold text-xs text-foreground">
                      Trend
                    </Label>
                    <Select
                      value={priceForm.trend}
                      onValueChange={(v) =>
                        setPriceForm((p) => ({ ...p, trend: v }))
                      }
                    >
                      <SelectTrigger className="h-11 rounded-xl font-body text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="up">↑ Rising</SelectItem>
                        <SelectItem value="down">↓ Falling</SelectItem>
                        <SelectItem value="stable">→ Stable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label className="font-display font-bold text-xs text-foreground">
                    {t("mandiName", lang)} *
                  </Label>
                  <Input
                    value={priceForm.mandi}
                    onChange={(e) =>
                      setPriceForm((p) => ({ ...p, mandi: e.target.value }))
                    }
                    placeholder="e.g. Kurnool APMC"
                    className="h-11 rounded-xl font-body text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label className="font-display font-bold text-xs text-foreground">
                      Price (₹/quintal) *
                    </Label>
                    <Input
                      type="number"
                      value={priceForm.price}
                      onChange={(e) =>
                        setPriceForm((p) => ({ ...p, price: e.target.value }))
                      }
                      placeholder="2400"
                      className="h-11 rounded-xl font-body text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="font-display font-bold text-xs text-foreground">
                      {t("arrivals", lang)} (qtl)
                    </Label>
                    <Input
                      type="number"
                      value={priceForm.volume}
                      onChange={(e) =>
                        setPriceForm((p) => ({ ...p, volume: e.target.value }))
                      }
                      placeholder="1200"
                      className="h-11 rounded-xl font-body text-sm"
                    />
                  </div>
                </div>

                <Button
                  data-ocid="admin.add_price_button"
                  onClick={handleAddPrice}
                  className="h-12 rounded-xl font-display font-bold"
                >
                  {priceSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Added!
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-4 h-4 mr-2" />
                      {t("addPrice", lang)}
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Mandi Management ──────────────────────────── */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-card">
        <button
          type="button"
          className={`${sectionClasses(openSection === "mandi")} rounded-t-2xl`}
          onClick={() => toggleSection("mandi")}
        >
          <div className="flex items-center gap-3">
            <Store className="w-5 h-5" />
            <span className="font-display font-bold text-base">
              {t("addMandi", lang)}
            </span>
          </div>
          {openSection === "mandi" ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        <AnimatePresence>
          {openSection === "mandi" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="p-4 flex flex-col gap-3 border-t border-border">
                <div className="flex flex-col gap-1.5">
                  <Label className="font-display font-bold text-xs text-foreground">
                    {t("mandiName", lang)} *
                  </Label>
                  <Input
                    value={mandiForm.name}
                    onChange={(e) =>
                      setMandiForm((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="e.g. Guntur Mirchi Yard"
                    className="h-11 rounded-xl font-body text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label className="font-display font-bold text-xs text-foreground">
                      {t("location", lang)} *
                    </Label>
                    <Select
                      value={mandiForm.locationZone}
                      onValueChange={(v) =>
                        setMandiForm((p) => ({ ...p, locationZone: v }))
                      }
                    >
                      <SelectTrigger className="h-11 rounded-xl font-body text-sm">
                        <SelectValue placeholder="State" />
                      </SelectTrigger>
                      <SelectContent>
                        {LOCATION_ZONES.map((z) => (
                          <SelectItem key={z} value={z}>
                            {z}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="font-display font-bold text-xs text-foreground">
                      Demand Level
                    </Label>
                    <Select
                      value={mandiForm.demandLevel}
                      onValueChange={(v) =>
                        setMandiForm((p) => ({ ...p, demandLevel: v }))
                      }
                    >
                      <SelectTrigger className="h-11 rounded-xl font-body text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label className="font-display font-bold text-xs text-foreground">
                      Distance (km)
                    </Label>
                    <Input
                      type="number"
                      value={mandiForm.distanceKm}
                      onChange={(e) =>
                        setMandiForm((p) => ({
                          ...p,
                          distanceKm: e.target.value,
                        }))
                      }
                      placeholder="75"
                      className="h-11 rounded-xl font-body text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="font-display font-bold text-xs text-foreground">
                      Active Buyers
                    </Label>
                    <Input
                      type="number"
                      value={mandiForm.activeBuyers}
                      onChange={(e) =>
                        setMandiForm((p) => ({
                          ...p,
                          activeBuyers: e.target.value,
                        }))
                      }
                      placeholder="20"
                      className="h-11 rounded-xl font-body text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label className="font-display font-bold text-xs text-foreground">
                    Specializations (comma-separated)
                  </Label>
                  <Input
                    value={mandiForm.specializations}
                    onChange={(e) =>
                      setMandiForm((p) => ({
                        ...p,
                        specializations: e.target.value,
                      }))
                    }
                    placeholder="Tomato, Chilli, Onion"
                    className="h-11 rounded-xl font-body text-sm"
                  />
                </div>

                <Button
                  data-ocid="admin.add_mandi_button"
                  onClick={handleAddMandi}
                  disabled={addMandiMutation.isPending}
                  className="h-12 rounded-xl font-display font-bold"
                >
                  {addMandiMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Adding...
                    </>
                  ) : addMandiMutation.isSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Mandi Added!
                    </>
                  ) : (
                    <>
                      <Store className="w-4 h-4 mr-2" />
                      {t("addMandi", lang)}
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Alert Dispatch ────────────────────────────── */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-card">
        <button
          type="button"
          className={`${sectionClasses(openSection === "alert")} rounded-t-2xl`}
          onClick={() => toggleSection("alert")}
        >
          <div className="flex items-center gap-3">
            <Send className="w-5 h-5" />
            <span className="font-display font-bold text-base">
              {t("sendAlert", lang)}
            </span>
          </div>
          {openSection === "alert" ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        <AnimatePresence>
          {openSection === "alert" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="p-4 flex flex-col gap-3 border-t border-border">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label className="font-display font-bold text-xs text-foreground">
                      Alert Type
                    </Label>
                    <Select
                      value={alertForm.alertType}
                      onValueChange={(v) =>
                        setAlertForm((p) => ({ ...p, alertType: v }))
                      }
                    >
                      <SelectTrigger className="h-11 rounded-xl font-body text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PriceSpike">Price Spike</SelectItem>
                        <SelectItem value="PriceDrop">Price Drop</SelectItem>
                        <SelectItem value="Shortage">Shortage</SelectItem>
                        <SelectItem value="DemandSurge">
                          Demand Surge
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="font-display font-bold text-xs text-foreground">
                      Farmer ID
                    </Label>
                    <Input
                      type="number"
                      value={alertForm.farmerId}
                      onChange={(e) =>
                        setAlertForm((p) => ({
                          ...p,
                          farmerId: e.target.value,
                        }))
                      }
                      placeholder="1"
                      className="h-11 rounded-xl font-body text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label className="font-display font-bold text-xs text-foreground">
                      Crop *
                    </Label>
                    <Select
                      value={alertForm.cropName}
                      onValueChange={(v) =>
                        setAlertForm((p) => ({ ...p, cropName: v }))
                      }
                    >
                      <SelectTrigger className="h-11 rounded-xl font-body text-sm">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {ALL_CROPS.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label className="font-display font-bold text-xs text-foreground">
                      {t("mandiName", lang)} *
                    </Label>
                    <Input
                      value={alertForm.mandiName}
                      onChange={(e) =>
                        setAlertForm((p) => ({
                          ...p,
                          mandiName: e.target.value,
                        }))
                      }
                      placeholder="Kurnool Mandi"
                      className="h-11 rounded-xl font-body text-sm"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <Label className="font-display font-bold text-xs text-foreground">
                    Alert Message *
                  </Label>
                  <Textarea
                    value={alertForm.message}
                    onChange={(e) =>
                      setAlertForm((p) => ({ ...p, message: e.target.value }))
                    }
                    placeholder="Price surged at Kurnool Mandi. Current: ₹2,400/quintal."
                    className="rounded-xl font-body text-sm min-h-[80px] resize-none"
                  />
                </div>

                {/* Channels */}
                <div className="flex flex-col gap-1.5">
                  <Label className="font-display font-bold text-xs text-foreground">
                    Dispatch Channels
                  </Label>
                  <div className="flex gap-2">
                    {["SMS", "WhatsApp", "Voice"].map((ch) => (
                      <button
                        type="button"
                        key={ch}
                        onClick={() => toggleChannel(ch)}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-display font-bold transition-all ${
                          alertForm.channels.includes(ch)
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {ch}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message preview */}
                {alertForm.message && (
                  <div className="bg-muted rounded-xl p-3 border border-border">
                    <p className="text-xs font-display font-bold text-muted-foreground mb-1.5 uppercase tracking-wide">
                      Preview
                    </p>
                    <p className="text-sm font-body text-foreground leading-relaxed">
                      {alertForm.message}
                    </p>
                    <p className="text-xs text-muted-foreground font-body mt-2">
                      Sending via:{" "}
                      {alertForm.channels.join(", ") || "No channels selected"}
                    </p>
                  </div>
                )}

                <Button
                  data-ocid="admin.send_alert_button"
                  onClick={handleSendAlert}
                  disabled={
                    addAlertMutation.isPending ||
                    alertForm.channels.length === 0
                  }
                  className="h-12 rounded-xl font-display font-bold"
                  variant="destructive"
                >
                  {addAlertMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : addAlertMutation.isSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Alert Dispatched!
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {t("sendAlert", lang)}
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
