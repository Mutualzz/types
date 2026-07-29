export type UiDensity = "compact" | "default" | "spacious";
export type MessageDisplay = "default" | "compact";
export type TimestampFormat = "relative" | "absolute";
export type DmPrivacy = "everyone" | "friends" | "nobody";
export type ProfileVisibility = "everyone" | "friends" | "nobody";

export const UI_DENSITY_OPTIONS: UiDensity[] = [
  "compact",
  "default",
  "spacious",
];

export const MESSAGE_DISPLAY_OPTIONS: MessageDisplay[] = ["default", "compact"];

export const TIMESTAMP_FORMAT_OPTIONS: TimestampFormat[] = [
  "relative",
  "absolute",
];

export const DM_PRIVACY_OPTIONS: DmPrivacy[] = [
  "everyone",
  "friends",
  "nobody",
];

export const PROFILE_VISIBILITY_OPTIONS: ProfileVisibility[] = [
  "everyone",
  "friends",
  "nobody",
];

export const CHAT_FONT_SCALE_MIN = 0.75;
export const CHAT_FONT_SCALE_MAX = 1.5;
export const CHAT_FONT_SCALE_STEP = 0.05;

export const BADGE_COLOR_PRESETS = [
  "#e03131",
  "#f03e3e",
  "#e64980",
  "#be4bdb",
  "#7950f2",
  "#4c6ef5",
  "#228be6",
  "#15aabf",
  "#12b886",
  "#40c057",
  "#fab005",
  "#fd7e14",
] as const;

export interface ClientPreferences {
  convertEmoticons: boolean;
  uiDensity: UiDensity;
  messageDisplay: MessageDisplay;
  chatFontScale: number;
  timestampFormat: TimestampFormat;
  showLinkEmbeds: boolean;
  gifAutoplay: boolean;
  revealAllSpoilers: boolean;
  showTypingIndicators: boolean;
  sendTypingIndicators: boolean;
  replyWithMention: boolean;
  quickReactionEmojis: string[];
  showEmojiPicker: boolean;
  showGifPicker: boolean;
  showStickerPicker: boolean;
  showMarkdownToolbar: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  defaultMemberListVisible: boolean;
  showRoleColorsInMessages: boolean;
}

export const DEFAULT_CLIENT_PREFERENCES: ClientPreferences = {
  convertEmoticons: true,
  uiDensity: "default",
  messageDisplay: "default",
  chatFontScale: 1,
  timestampFormat: "relative",
  showLinkEmbeds: true,
  gifAutoplay: true,
  revealAllSpoilers: false,
  showTypingIndicators: true,
  sendTypingIndicators: true,
  replyWithMention: true,
  quickReactionEmojis: [],
  showEmojiPicker: true,
  showGifPicker: true,
  showStickerPicker: true,
  showMarkdownToolbar: true,
  reducedMotion: false,
  highContrast: false,
  defaultMemberListVisible: true,
  showRoleColorsInMessages: false,
};

export type UserExtendedSettings = ClientPreferences & {
  whoCanDm: DmPrivacy;
  profileVisibility: ProfileVisibility;
  shareRpcPresence: boolean;
  autoCheckUpdates: boolean;
};

export const DEFAULT_EXTENDED_SETTINGS: UserExtendedSettings = {
  ...DEFAULT_CLIENT_PREFERENCES,
  whoCanDm: "everyone",
  profileVisibility: "everyone",
  shareRpcPresence: true,
  autoCheckUpdates: true,
};

export function mergeClientPreferences(
  partial?: Partial<ClientPreferences> | Record<string, unknown> | null,
): ClientPreferences {
  const source = partial ?? {};
  const timestampFormat =
    source.timestampFormat === "absolute" ? "absolute" : "relative";
  const quickReactionEmojis = Array.isArray(source.quickReactionEmojis)
    ? source.quickReactionEmojis
    : DEFAULT_CLIENT_PREFERENCES.quickReactionEmojis;

  return {
    ...DEFAULT_CLIENT_PREFERENCES,
    ...source,
    timestampFormat,
    quickReactionEmojis: quickReactionEmojis.filter(
      (key): key is string => typeof key === "string" && key.length > 0,
    ),
  };
}

export function mergeExtendedSettings(
  partial?: Partial<UserExtendedSettings> | Record<string, unknown> | null,
): UserExtendedSettings {
  const preferences = mergeClientPreferences(partial);
  const whoCanDm =
    partial?.whoCanDm === "friends" || partial?.whoCanDm === "nobody"
      ? partial.whoCanDm
      : "everyone";
  const profileVisibility =
    partial?.profileVisibility === "friends" ||
    partial?.profileVisibility === "nobody"
      ? partial.profileVisibility
      : "everyone";

  return {
    ...preferences,
    whoCanDm,
    profileVisibility,
    shareRpcPresence:
      typeof partial?.shareRpcPresence === "boolean"
        ? partial.shareRpcPresence
        : true,
    autoCheckUpdates:
      typeof partial?.autoCheckUpdates === "boolean"
        ? partial.autoCheckUpdates
        : true,
  };
}

export function applyClientPreferencesInPlace(
  target: ClientPreferences,
  patch: Partial<ClientPreferences>,
): ClientPreferences {
  return Object.assign(target, mergeClientPreferences({ ...target, ...patch }));
}

export function applyExtendedSettingsInPlace(
  target: UserExtendedSettings,
  patch: Partial<UserExtendedSettings>,
): UserExtendedSettings {
  return Object.assign(target, mergeExtendedSettings({ ...target, ...patch }));
}
