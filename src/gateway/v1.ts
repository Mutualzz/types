import type { APIPrivateUser, APISpace, APITheme } from "../api/v1";

export const GatewayOpcodes = {
    Dispatch: 0,
    Heartbeat: 1,
    Identify: 2,
    Resume: 3,
    Reconnect: 4,
    InvalidSession: 5,
    Hello: 6,
    HeartbeatAck: 7,
    System: 8,
} as const;

export const GatewayDispatchEvents = {
    Ready: "READY",
    Resume: "RESUME",
    UserUpdate: "USER_UPDATE",
} as const;

export const GatewayCloseCodes = {
    UnknownError: 1000,
    InvalidConnection: 1008,
    SessionTimedOut: 4000,
    InvalidSession: 4001,
    NotAuthenticated: 4002,
};

export interface GatewayPayload {
    op: keyof typeof GatewayOpcodes;
    d?: any;
    s?: number;
    t?: keyof typeof GatewayDispatchEvents;
}

export interface GatewaySession {
    userId: string;
    lastUsedAt: number;
    seq: number;
}

export interface GatewayReadyDispatchPayload {
    sessionId: string;
    user: APIPrivateUser;
    themes: APITheme[];
    spaces: APISpace[];
}
