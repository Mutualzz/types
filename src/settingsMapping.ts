import type { APIUserSettings } from "./api";
import type {
  ClientPreferences,
  DmPrivacy,
  ProfileVisibility,
} from "./userPreferences";
import {
  DEFAULT_CLIENT_PREFERENCES,
  mergeClientPreferences,
} from "./userPreferences";

export interface UserSettingsDbRow {
  currentTheme?: string | null;
  currentIcon?: string | null;
  preferEmbossed?: boolean;
  spacePositions?: (string | bigint)[];
  preferredSelfMute?: boolean;
  preferredSelfDeaf?: boolean;
  favoriteEmojis?: string[];
  favoriteGifs?: string[];
  favoriteStickers?: string[];
  pushEnabled?: boolean;
  pushDirectMessages?: boolean;
  pushMentions?: boolean;
  shareActivity?: boolean;
  shareRecentActivity?: boolean;
  lastSeenChangelogId?: string | bigint | null;
  whoCanDm?: DmPrivacy | null;
  profileVisibility?: ProfileVisibility | null;
  extendedSettings?: Partial<ClientPreferences> | Record<string, unknown> | null;
  clientPreferences?: Partial<ClientPreferences> | Record<string, unknown> | null;
  updatedAt: Date;
}

export const CLIENT_PREFERENCE_KEYS = [
  "convertEmoticons",
  "uiDensity",
  "messageDisplay",
  "chatFontScale",
  "timestampFormat",
  "showLinkEmbeds",
  "gifAutoplay",
  "revealAllSpoilers",
  "showTypingIndicators",
  "sendTypingIndicators",
  "replyWithMention",
  "quickReactionEmojis",
  "showEmojiPicker",
  "showGifPicker",
  "showStickerPicker",
  "showMarkdownToolbar",
  "reducedMotion",
  "highContrast",
  "defaultMemberListVisible",
  "showRoleColorsInMessages",
] as const satisfies readonly (keyof ClientPreferences)[];

export type ClientPreferenceKey = (typeof CLIENT_PREFERENCE_KEYS)[number];

export const PRIVACY_SETTING_KEYS = ["whoCanDm", "profileVisibility"] as const;

export const SYNCED_COLUMN_KEYS = [
  "currentTheme",
  "currentIcon",
  "preferEmbossed",
  "spacePositions",
  "preferredSelfMute",
  "preferredSelfDeaf",
  "favoriteEmojis",
  "favoriteGifs",
  "favoriteStickers",
  "pushEnabled",
  "pushDirectMessages",
  "pushMentions",
  "shareActivity",
  "shareRecentActivity",
  "lastSeenChangelogId",
  ...PRIVACY_SETTING_KEYS,
] as const;

export type SyncedSettingsPatch = Partial<Omit<APIUserSettings, "updatedAt">> & {
  extendedSettings?: Partial<ClientPreferences> | null;
  clientPreferences?: Partial<ClientPreferences> | null;
};

export type DbSettingsUpdate = Partial<{
  currentTheme: string | null;
  currentIcon: string | null;
  preferEmbossed: boolean;
  spacePositions: bigint[];
  preferredSelfMute: boolean;
  preferredSelfDeaf: boolean;
  favoriteEmojis: string[];
  favoriteGifs: string[];
  favoriteStickers: string[];
  pushEnabled: boolean;
  pushDirectMessages: boolean;
  pushMentions: boolean;
  shareActivity: boolean;
  shareRecentActivity: boolean;
  lastSeenChangelogId: bigint | null;
  whoCanDm: DmPrivacy;
  profileVisibility: ProfileVisibility;
  extendedSettings: ClientPreferences;
  clientPreferences: ClientPreferences;
}>;

function readStoredPreferences(
  row: UserSettingsDbRow,
): Partial<ClientPreferences> | null {
  const legacy = row.extendedSettings;
  const client = row.clientPreferences;
  const clientRecord =
    client && typeof client === "object"
      ? (client as Record<string, unknown>)
      : null;
  const clientHasData =
    clientRecord !== null && Object.keys(clientRecord).length > 0;
  const raw = clientHasData ? client : legacy;
  if (!raw || typeof raw !== "object") return null;
  return raw;
}

function readPrivacyValue<K extends "whoCanDm" | "profileVisibility">(
  row: UserSettingsDbRow,
  key: K,
  fallback: APIUserSettings[K],
): APIUserSettings[K] {
  const columnValue = row[key];
  if (columnValue === "everyone" || columnValue === "friends" || columnValue === "nobody") {
    return columnValue as APIUserSettings[K];
  }

  const stored = readStoredPreferences(row);
  const jsonValue = (stored as Record<string, unknown> | null)?.[key];
  if (jsonValue === "everyone" || jsonValue === "friends" || jsonValue === "nobody") {
    return jsonValue;
  }

  return fallback;
}

export function normalizeUserSettings(row: UserSettingsDbRow): APIUserSettings {
  const preferences = mergeClientPreferences(readStoredPreferences(row));

  return {
    currentTheme: row.currentTheme ?? "baseDark",
    currentIcon: row.currentIcon ?? null,
    preferEmbossed: row.preferEmbossed ?? false,
    spacePositions: (row.spacePositions ?? []).map(String),
    preferredSelfMute: row.preferredSelfMute ?? false,
    preferredSelfDeaf: row.preferredSelfDeaf ?? false,
    favoriteEmojis: row.favoriteEmojis ?? [],
    favoriteGifs: row.favoriteGifs ?? [],
    favoriteStickers: row.favoriteStickers ?? [],
    pushEnabled: row.pushEnabled ?? true,
    pushDirectMessages: row.pushDirectMessages ?? true,
    pushMentions: row.pushMentions ?? true,
    shareActivity: row.shareActivity ?? true,
    shareRecentActivity: row.shareRecentActivity ?? true,
    lastSeenChangelogId: row.lastSeenChangelogId
      ? String(row.lastSeenChangelogId)
      : null,
    whoCanDm: readPrivacyValue(row, "whoCanDm", "everyone"),
    profileVisibility: readPrivacyValue(row, "profileVisibility", "everyone"),
    ...preferences,
    updatedAt: row.updatedAt,
  };
}

function stripPrivacyFromPreferences(
  preferences: ClientPreferences,
): ClientPreferences {
  const next = { ...preferences } as ClientPreferences & Record<string, unknown>;
  delete next.whoCanDm;
  delete next.profileVisibility;
  delete next.shareRpcPresence;
  delete next.autoCheckUpdates;
  return next;
}

export function denormalizeSettingsPatch(
  patch: SyncedSettingsPatch,
  existing: UserSettingsDbRow,
): DbSettingsUpdate {
  const columnPatch: DbSettingsUpdate = {};
  const preferencePatch: Partial<ClientPreferences> = {};

  const nested =
    patch.extendedSettings ??
    patch.clientPreferences ??
    (null as Partial<ClientPreferences> | null);

  for (const [key, value] of Object.entries(patch)) {
    if (value === undefined) continue;
    if (key === "extendedSettings" || key === "clientPreferences") continue;
    if (key === "spacePositions" && Array.isArray(value)) {
      columnPatch.spacePositions = value.map((id) => BigInt(id));
      continue;
    }
    if (key === "lastSeenChangelogId") {
      columnPatch.lastSeenChangelogId =
        value == null ? null : BigInt(String(value));
      continue;
    }
    if ((PRIVACY_SETTING_KEYS as readonly string[]).includes(key)) {
      (columnPatch as Record<string, unknown>)[key] = value;
      continue;
    }
    if ((SYNCED_COLUMN_KEYS as readonly string[]).includes(key)) {
      (columnPatch as Record<string, unknown>)[key] = value;
      continue;
    }
    if ((CLIENT_PREFERENCE_KEYS as readonly string[]).includes(key)) {
      (preferencePatch as Record<string, unknown>)[key] = value;
    }
  }

  if (nested && typeof nested === "object") {
    Object.assign(preferencePatch, nested);
  }

  const hasPreferencePatch = Object.keys(preferencePatch).length > 0;
  if (hasPreferencePatch || existing.extendedSettings || existing.clientPreferences) {
    const merged = stripPrivacyFromPreferences(
      mergeClientPreferences({
        ...readStoredPreferences(existing),
        ...preferencePatch,
      }),
    );
    columnPatch.clientPreferences = merged;
  }

  return columnPatch;
}

export function flattenSettingsPatch(
  patch: SyncedSettingsPatch,
): SyncedSettingsPatch {
  const nested = patch.extendedSettings ?? patch.clientPreferences;
  if (!nested || typeof nested !== "object") {
    const { extendedSettings, clientPreferences, ...rest } = patch;
    return rest;
  }

  const { extendedSettings, clientPreferences, ...rest } = patch;
  return {
    ...rest,
    ...nested,
  };
}

export const DEFAULT_FLAT_USER_SETTINGS = normalizeUserSettings({
  updatedAt: new Date(0),
});
