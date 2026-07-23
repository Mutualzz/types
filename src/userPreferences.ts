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

export type UserExtendedSettings = {
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
  whoCanDm: DmPrivacy;
  profileVisibility: ProfileVisibility;
  reducedMotion: boolean;
  highContrast: boolean;
  defaultMemberListVisible: boolean;
  shareRpcPresence: boolean;
  autoCheckUpdates: boolean;
};

export const DEFAULT_EXTENDED_SETTINGS: UserExtendedSettings = {
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
  whoCanDm: "everyone",
  profileVisibility: "everyone",
  reducedMotion: false,
  highContrast: false,
  defaultMemberListVisible: true,
  shareRpcPresence: true,
  autoCheckUpdates: true,
};

export function mergeExtendedSettings(
  partial?: Partial<UserExtendedSettings> | null,
): UserExtendedSettings {
  const timestampFormat =
    partial?.timestampFormat === "absolute" ? "absolute" : "relative";

  return {
    ...DEFAULT_EXTENDED_SETTINGS,
    ...(partial ?? {}),
    timestampFormat,
    quickReactionEmojis: partial?.quickReactionEmojis
      ? [...partial.quickReactionEmojis]
      : [...DEFAULT_EXTENDED_SETTINGS.quickReactionEmojis],
  };
}

export function applyExtendedSettingsInPlace(
  target: UserExtendedSettings,
  patch: Partial<UserExtendedSettings>,
): UserExtendedSettings {
  return Object.assign(target, mergeExtendedSettings({ ...target, ...patch }));
}
