export type PresenceStatus =
    | "online"
    | "idle"
    | "dnd"
    | "invisible"
    | "offline";
export type PresenceActivityType = "playing" | "listening" | "custom";

export type PresenceActivityEmoji = {
    id?: string;
    name: string;
    animated?: boolean;
};

export type PresenceActivity = {
    type: PresenceActivityType;
    name: string;
    details?: string;
    state?: string;
    emoji?: PresenceActivityEmoji;
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
