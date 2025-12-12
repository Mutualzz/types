import type {
    APIPrivateUser,
    APISpace,
    APITheme,
    APIUserSettings,
} from "../api";

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
    LazyRequest: 9,
} as const;

export const GatewayDispatchEvents = {
    Ready: "READY",
    Resume: "RESUME",
    UserUpdate: "USER_UPDATE",
    UserSettingsUpdate: "USER_SETTINGS_UPDATE",
    SpaceCreate: "SPACE_CREATE",
    SpaceDelete: "SPACE_DELETE",
    SpaceUpdate: "SPACE_UPDATE",
    SpaceMemberAdd: "SPACE_MEMBER_ADD",
    SpaceMemberRemove: "SPACE_MEMBER_REMOVE",
    SpaceMemberUpdate: "SPACE_MEMBER_UPDATE",
    SpaceMemberListUpdate: "SPACE_MEMBER_LIST_UPDATE",
    ChannelCreate: "CHANNEL_CREATE",
    ChannelUpdate: "CHANNEL_UPDATE",
    BulkChannelUpdate: "BULK_CHANNEL_UPDATE",
    BulkChannelDelete: "BULK_CHANNEL_DELETE",
    ChannelDelete: "CHANNEL_DELETE",
    MessageCreate: "MESSAGE_CREATE",
    MessageDelete: "MESSAGE_DELETE",
    MessageUpdate: "MESSAGE_UPDATE",
    InviteCreate: "INVITE_CREATE",
    InviteUpdate: "INVITE_UPDATE",
    InviteDelete: "INVITE_DELETE",
} as const;

export type EVENT = keyof typeof GatewayDispatchEvents;

export const GatewayCloseCodes = {
    UnknownError: 1000,
    InvalidConnection: 1008,
    SessionTimedOut: 4000,
    InvalidSession: 4001,
    NotAuthenticated: 4002,
    RateLimit: 4008,
};

export interface GatewayPayload {
    op: keyof typeof GatewayOpcodes;
    d?: any;
    s?: number;
    t?: keyof typeof GatewayDispatchEvents;
}

export interface WireGatewayPayload {
    op: (typeof GatewayOpcodes)[keyof typeof GatewayOpcodes];
    d?: any;
    s?: number;
    t?: (typeof GatewayDispatchEvents)[keyof typeof GatewayDispatchEvents];
}

export interface GatewaySession {
    userId: string;
    lastUsedAt: number;
    seq: number;
}

export interface BaseEvent<T extends EVENT = EVENT, D = any> {
    space_id?: string | null;
    user_id?: string | null;
    channel_id?: string | null;
    event: T;
    data: D;
}

export type GatewayReadyPayload = {
    sessionId: string;
    user: APIPrivateUser;
    themes: APITheme[];
    spaces: APISpace[];
    settings: APIUserSettings;
};
