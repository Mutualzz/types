export type PresenceStatus =
    | "online"
    | "idle"
    | "dnd"
    | "invisible"
    | "offline";
export type PresenceActivityType = "playing" | "listening" | "custom";

export type PresenceActivity = {
    type: PresenceActivityType;
    name: string;
    details?: string;
    state?: string;
    timestamps?: { start?: number; end?: number };
};

export type PresencePayload = {
    status: PresenceStatus;
    activities: PresenceActivity[];
    afk?: boolean;
    since?: number;
    device?: "desktop" | "mobile" | "web";
    updatedAt: number;
};

export interface PresenceSchedule {
    status: PresenceStatus;
    revertTo: PresenceStatus;
    until: number; // ms epoch
}
