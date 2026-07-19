import type { Snowflake } from "../common";

export type CallStatus = "ringing" | "active" | "ended";

export type CallRespondAction = "accept" | "decline" | "cancel";

export interface CallCreatePayload {
  channelId: Snowflake;
  silent?: boolean;
}

export interface CallRespondPayload {
  callId: Snowflake;
  action: CallRespondAction;
}

export interface APICall {
  id: Snowflake;
  channelId: Snowflake;
  initiatorId: Snowflake;
  status: CallStatus;
  silent: boolean;
  ringing: Snowflake[];
  accepted: Snowflake[];
  createdAt: number;
  aloneSince: number | null;
  soloTimeoutMs: number;
  connected?: boolean;
}

export const CALL_SOLO_TIMEOUT_MS = 180_000;
