import type {
  APIChannel,
  APIExpression,
  APIMinecraftLink,
  APIPrivateUser,
  APIReadState,
  APIRelationship,
  APISpace,
  APISpaceMember,
  APITheme,
  APIUser,
  APIUserProfile,
  APIUserSettings,
} from "../api";
import type {
  CustomStatusSchedule,
  PresencePayload,
  PresenceSchedule,
} from "../presence";
import type { APICall } from "../call";
import type { VoiceState } from "../voice";

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
  PresenceUpdate: 10,
  PresenceScheduleSet: 11,
  PresenceScheduleClear: 12,
  VoiceStateUpdate: 13,
  SubscribeUser: 14,
  UnsubscribeUser: 15,
  CustomStatusScheduleSet: 16,
  CustomStatusScheduleClear: 17,
  CallCreate: 18,
  CallRespond: 19,
} as const;

export const GatewayDispatchEvents = {
  Ready: "READY",
  Resume: "RESUME",

  // Users
  UserUpdate: "USER_UPDATE",
  UserSettingsUpdate: "USER_SETTINGS_UPDATE",
  UserProfileUpdate: "USER_PROFILE_UPDATE",
  UserForceLogout: "USER_FORCE_LOGOUT",

  // Spaces
  SpaceCreate: "SPACE_CREATE",
  SpaceDelete: "SPACE_DELETE",
  SpaceUpdate: "SPACE_UPDATE",

  // Members
  SpaceMemberAdd: "SPACE_MEMBER_ADD",
  SpaceMemberRemove: "SPACE_MEMBER_REMOVE",
  SpaceMemberUpdate: "SPACE_MEMBER_UPDATE",
  SpaceMemberListUpdate: "SPACE_MEMBER_LIST_UPDATE",

  // Member Roles
  SpaceMemberRoleAdd: "SPACE_MEMBER_ROLE_ADD",
  SpaceMemberRoleAddBulk: "SPACE_MEMBER_ROLE_ADD_BULK",
  SpaceMemberRoleRemove: "SPACE_MEMBER_ROLE_REMOVE",

  // Channels
  ChannelCreate: "CHANNEL_CREATE",
  ChannelUpdate: "CHANNEL_UPDATE",
  ChannelUpdateBulk: "CHANNEL_UPDATE_BULK",
  ChannelDeleteBulk: "CHANNEL_DELETE_BULK",
  ChannelDelete: "CHANNEL_DELETE",

  // Messages
  MessageAck: "MESSAGE_ACK",
  MessageAckBulk: "MESSAGE_ACK_BULK",
  MessageCreate: "MESSAGE_CREATE",
  MessageUpdate: "MESSAGE_UPDATE",
  MessageDelete: "MESSAGE_DELETE",
  MessageDeleteBulk: "MESSAGE_DELETE_BULK",
  MessageReactionAdd: "MESSAGE_REACTION_ADD",
  MessageReactionRemove: "MESSAGE_REACTION_REMOVE",
  MessageReactionRemoveAll: "MESSAGE_REACTION_REMOVE_ALL",
  MessageReactionRemoveEmoji: "MESSAGE_REACTION_REMOVE_EMOJI",

  // Invites
  InviteCreate: "INVITE_CREATE",
  InviteUpdate: "INVITE_UPDATE",
  InviteDelete: "INVITE_DELETE",

  // Roles
  RoleCreate: "ROLE_CREATE",
  RoleUpdate: "ROLE_UPDATE",
  RoleDelete: "ROLE_DELETE",

  // Presence
  PresenceUpdate: "PRESENCE_UPDATE",
  PresenceScheduleUpdate: "PRESENCE_SCHEDULE_UPDATE",
  CustomStatusScheduleUpdate: "CUSTOM_STATUS_SCHEDULE_UPDATE",

  // Voice
  VoiceServerUpdate: "VOICE_SERVER_UPDATE",
  VoiceStateSync: "VOICE_STATE_SYNC",
  VoiceStateUpdate: "VOICE_STATE_UPDATE",

  // Calls
  CallCreate: "CALL_CREATE",
  CallUpdate: "CALL_UPDATE",
  CallDelete: "CALL_DELETE",

  // Expressions
  ExpressionCreate: "EXPRESSION_CREATE",
  ExpressionUpdate: "EXPRESSION_UPDATE",
  ExpressionDelete: "EXPRESSION_DELETE",

  // Relationships
  RelationshipCreate: "RELATIONSHIP_CREATE",
  RelationshipUpdate: "RELATIONSHIP_UPDATE",
  RelationshipDelete: "RELATIONSHIP_DELETE",

  // Minecraft bridge
  MinecraftLinkUpdate: "MINECRAFT_LINK_UPDATE",
  BridgeChat: "BRIDGE_CHAT",
  BridgeJoin: "BRIDGE_JOIN",
  BridgeLeave: "BRIDGE_LEAVE",
  BridgeVoiceJoin: "BRIDGE_VOICE_JOIN",
  BridgeVoiceLeave: "BRIDGE_VOICE_LEAVE",
  BridgePresence: "BRIDGE_PRESENCE",
  BridgeMemberAdd: "BRIDGE_MEMBER_ADD",
  BridgeMemberRemove: "BRIDGE_MEMBER_REMOVE",

  // Space Bans
  SpaceBanAdd: "SPACE_BAN_ADD",
  SpaceBanRemove: "SPACE_BAN_REMOVE",

  // Typing
  TypingStart: "TYPING_START",

  // Group DM
  ChannelRecipientAdd: "CHANNEL_RECIPIENT_ADD",
  ChannelRecipientRemove: "CHANNEL_RECIPIENT_REMOVE",

  // Posts
  PostCreate: "POST_CREATE",
  PostUpdate: "POST_UPDATE",
  PostDelete: "POST_DELETE",

  // Post Comments
  PostCommentCreate: "POST_COMMENT_CREATE",
  PostCommentUpdate: "POST_COMMENT_UPDATE",
  PostCommentDelete: "POST_COMMENT_DELETE",

  // Post Engagement
  PostLikeAdd: "POST_LIKE_ADD",
  PostLikeRemove: "POST_LIKE_REMOVE",
  PostSaveAdd: "POST_SAVE_ADD",
  PostSaveRemove: "POST_SAVE_REMOVE",
  PostShareAdd: "POST_SHARE_ADD",
  PostShareRemove: "POST_SHARE_REMOVE",
} as const;

export type EVENT = keyof typeof GatewayDispatchEvents;

export const GatewayCloseCodes = {
  UnknownError: 1000,
  InvalidConnection: 1008,
  SessionTimedOut: 4000,
  InvalidSession: 4001,
  NotAuthenticated: 4002,
  RateLimit: 4008,
  MissingPermissions: 4009,
  ForceLogout: 4010,
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
  channels: APIChannel[];
  relationships: APIRelationship[];
  expressions: APIExpression[];
  readStates: APIReadState[];
  mergedPresences: Record<string, PresencePayload>;
  profile: APIUserProfile | null;
  presenceSchedule: PresenceSchedule | null;
  customStatusSchedule: CustomStatusSchedule | null;
  calls?: APICall[];
  voiceStates?: VoiceState[];
  users?: APIUser[];
  minecraftLink?: APIMinecraftLink | null;
};

export interface GatewaySpaceMember extends APISpaceMember {
  presence?: PresencePayload;
}
