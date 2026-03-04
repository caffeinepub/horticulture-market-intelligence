import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Alert {
    id: bigint;
    alertType: string;
    farmerId: bigint;
    isRead: boolean;
    channels: Array<string>;
    message: string;
    timestamp: bigint;
    cropName: string;
    mandiName: string;
}
export interface Mandi {
    id: bigint;
    activeBuyers: bigint;
    name: string;
    distanceKm: number;
    demandLevel: string;
    locationZone: string;
    specializations: Array<string>;
}
export interface backendInterface {
    addAlert(farmerId: bigint, alertType: string, cropName: string, mandiName: string, message: string, channels: Array<string>): Promise<bigint>;
    addMandi(name: string, locationZone: string, distanceKm: number, activeBuyers: bigint, specializations: Array<string>, demandLevel: string): Promise<bigint>;
    getAlertsForFarmer(farmerId: bigint): Promise<Array<Alert>>;
    getMandisByCrop(_crop: string): Promise<Array<Mandi>>;
}
