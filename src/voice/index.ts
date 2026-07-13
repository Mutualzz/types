import type { Snowflake } from "../common.ts";

/** Which client surface holds this voice session. */
export type VoiceClient = "desktop" | "mobile" | "web" | "minecraft";

export interface VoiceState {
  userId: Snowflake;
  spaceId?: Snowflake | null;
  channelId?: Snowflake | null;

  selfMute: boolean;
  selfDeaf: boolean;

  spaceMute: boolean;
  spaceDeaf: boolean;

  sessionId: string;
  updatedAt: number;
  joinedAt: number;

  client?: VoiceClient;
}

export const VoiceOpcodes = {
  VoiceGetRTPCapabilities: 0,
  VoiceSetRTPCapabilities: 1,
  VoiceCreateTransport: 2,
  VoiceConnectTransport: 3,
  VoiceProduce: 4,
  VoiceConsume: 5,
  VoiceResumeConsumer: 6,
  VoiceCloseProducer: 7,
  VoiceLeave: 8,
  VoiceAuthenticate: 9,
} as const;

export type VoiceOpcode = (typeof VoiceOpcodes)[keyof typeof VoiceOpcodes];

export const VoiceDispatchEvents = {
  VoiceNewProducer: "VOICE_NEW_PRODUCER",
  VoiceProducerClosed: "VOICE_PRODUCER_CLOSED",

  VoicePeerJoined: "VOICE_PEER_JOINED",
  VoicePeerLeft: "VOICE_PEER_LEFT",

  VoiceStateUpdate: "VOICE_STATE_UPDATE",
  VoiceStateSync: "VOICE_STATE_SYNC",
} as const;

export type VoiceDispatchEvent =
  (typeof VoiceDispatchEvents)[keyof typeof VoiceDispatchEvents];
