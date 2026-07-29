export type PresenceStatus =
    | "online"
    | "idle"
    | "dnd"
    | "invisible"
    | "offline";
export type PresenceActivityType = "playing" | "listening" | "custom";

export interface PresenceActivityEmoji {
    id?: string;
    name: string;
    animated?: boolean;
}

export interface PresenceActivityAssets {
    largeImageUrl?: string;
    largeText?: string;
    smallImageUrl?: string;
    smallText?: string;
}

export interface PresenceActivity {
    type: PresenceActivityType;
    name: string;
    applicationId?: string;
    details?: string;
    state?: string;
    url?: string;
    emoji?: PresenceActivityEmoji;
    timestamps?: { start?: number; end?: number };
    assets?: PresenceActivityAssets;
}

export interface PresencePayload {
    status: PresenceStatus;
    activities: PresenceActivity[];
    afk?: boolean;
    since?: number;
    device?: "desktop" | "mobile" | "web";
    updatedAt: number;
}

export interface PresenceSchedule {
    status: PresenceStatus;
    revertTo: PresenceStatus;
    until: number; // ms epoch
}

export interface CustomStatusSnapshot {
    text: string | null;
    emoji: PresenceActivityEmoji | null;
}

export interface CustomStatusSchedule {
    text: string;
    emoji: PresenceActivityEmoji | null;
    revertTo: CustomStatusSnapshot | null;
    until: number; // ms epoch
}
