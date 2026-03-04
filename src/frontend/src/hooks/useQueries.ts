import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Alert, Mandi } from "../backend.d";
import { useActor } from "./useActor";

export type { Alert, Mandi };

// ── Alerts ─────────────────────────────────────────────
export function useAlertsForFarmer(farmerId: bigint) {
  const { actor, isFetching } = useActor();
  return useQuery<Alert[]>({
    queryKey: ["alerts", farmerId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAlertsForFarmer(farmerId);
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

// ── Mandis ─────────────────────────────────────────────
export function useMandisByCrop(crop: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Mandi[]>({
    queryKey: ["mandis", crop],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMandisByCrop(crop);
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

// ── Add Alert ──────────────────────────────────────────
export function useAddAlert() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      farmerId: bigint;
      alertType: string;
      cropName: string;
      mandiName: string;
      message: string;
      channels: string[];
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addAlert(
        params.farmerId,
        params.alertType,
        params.cropName,
        params.mandiName,
        params.message,
        params.channels,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
    },
  });
}

// ── Add Mandi ──────────────────────────────────────────
export function useAddMandi() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      name: string;
      locationZone: string;
      distanceKm: number;
      activeBuyers: bigint;
      specializations: string[];
      demandLevel: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.addMandi(
        params.name,
        params.locationZone,
        params.distanceKm,
        params.activeBuyers,
        params.specializations,
        params.demandLevel,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mandis"] });
    },
  });
}
