import type { Snowflake } from "../common.ts";

export interface VoiceState {
    userId: Snowflake;
    spaceId: Snowflake;
    channelId: Snowflake | null;

    selfMute: boolean;
    selfDeaf: boolean;

    spaceMute: boolean;
    spaceDeaf: boolean;

    sessionId: string;
    updatedAt: number;
}

export const VoiceOpcodes = {
    VoiceGetRTPCapabilities: 0,
    VoiceSetRTPCapabilities: 1,
    VoiceCreateTransport: 2,
    VoiceConnectTransport: 3,
    VoiceProduce: 4,
    VoiceConsume: 5,
    VoiceResumeConsumer: 6,
    VoiceLeave: 7,
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
