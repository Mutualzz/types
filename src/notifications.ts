export enum NotificationLevel {
  All = 0,
  Mentions = 1,
  Nothing = 2,
}

export type APISpaceNotificationSettings = {
  spaceId: string;
  level: NotificationLevel;
  mutedUntil: Date | string | null;
  suppressEveryone: boolean;
  suppressRoles: boolean;
};

export type NotificationMessageContext = {
  isDirectMention: boolean;
  isRoleMention: boolean;
  isEveryoneMention: boolean;
  isHereMention: boolean;
  isRegularMessage: boolean;
};

export type NotificationSuppressOptions = {
  suppressEveryone: boolean;
  suppressRoles: boolean;
};

export const DEFAULT_NOTIFICATION_LEVEL = NotificationLevel.Mentions;

export function isNotificationMuteActive(
  mutedUntil: Date | string | null | undefined,
  now = Date.now(),
): boolean {
  if (!mutedUntil) return false;
  return new Date(mutedUntil).getTime() > now;
}

export function resolveEffectiveNotificationLevel(input: {
  spaceLevel?: NotificationLevel | null;
  spaceMutedUntil?: Date | string | null;
  channelLevel?: NotificationLevel | null;
  channelMutedUntil?: Date | string | null;
  now?: number;
}): NotificationLevel {
  const now = input.now ?? Date.now();

  if (isNotificationMuteActive(input.channelMutedUntil, now)) {
    return NotificationLevel.Nothing;
  }
  if (input.channelLevel != null) return input.channelLevel;
  if (isNotificationMuteActive(input.spaceMutedUntil, now)) {
    return NotificationLevel.Nothing;
  }
  return input.spaceLevel ?? DEFAULT_NOTIFICATION_LEVEL;
}

export function shouldDeliverMessageNotification(
  level: NotificationLevel,
  ctx: NotificationMessageContext,
  suppress: NotificationSuppressOptions,
): boolean {
  if (level === NotificationLevel.Nothing) return false;

  const isMention =
    ctx.isDirectMention ||
    ctx.isRoleMention ||
    ctx.isEveryoneMention ||
    ctx.isHereMention;

  if (level === NotificationLevel.All) {
    if (ctx.isEveryoneMention && suppress.suppressEveryone) return false;
    if (ctx.isRoleMention && suppress.suppressRoles) return false;
    if (ctx.isHereMention && suppress.suppressEveryone) return false;
    return true;
  }

  if (!isMention) return false;
  if (ctx.isDirectMention) return true;
  if (ctx.isRoleMention && !suppress.suppressRoles) return true;
  if (ctx.isEveryoneMention && !suppress.suppressEveryone) return true;
  if (ctx.isHereMention && !suppress.suppressEveryone) return true;
  return false;
}

export function shouldIncrementMentionCount(
  level: NotificationLevel,
  ctx: NotificationMessageContext,
  suppress: NotificationSuppressOptions,
): boolean {
  if (level === NotificationLevel.Nothing) return false;
  if (!ctx.isDirectMention && !ctx.isRoleMention && !ctx.isEveryoneMention && !ctx.isHereMention) {
    return false;
  }
  if (ctx.isDirectMention) return true;
  if (ctx.isRoleMention && !suppress.suppressRoles) return true;
  if (ctx.isEveryoneMention && !suppress.suppressEveryone) return true;
  if (ctx.isHereMention && !suppress.suppressEveryone) return true;
  return false;
}

export function computeMutedUntilDuration(
  duration: "forever" | "1h" | "8h" | "24h" | "1w" | "off",
  now = Date.now(),
): Date | null {
  switch (duration) {
    case "off":
      return null;
    case "forever":
      return new Date(now + 1000 * 60 * 60 * 24 * 365 * 10);
    case "1h":
      return new Date(now + 1000 * 60 * 60);
    case "8h":
      return new Date(now + 1000 * 60 * 60 * 8);
    case "24h":
      return new Date(now + 1000 * 60 * 60 * 24);
    case "1w":
      return new Date(now + 1000 * 60 * 60 * 24 * 7);
  }
}
