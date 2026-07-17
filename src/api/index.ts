import {
  type AppealStatus,
  type AppMode,
  type ChannelType,
  type EmbedType,
  ExpressionType,
  type InviteType,
  type MentionType,
  type MessageType,
  ReadStateType,
  RelationshipType,
  type ReportReason,
  type ReportStatus,
  type ReportTargetType,
  type Snowflake,
  type StaffActionType,
  type SupportTicketCategory,
  type SupportTicketStatus,
  type ThemeStyle,
  type ThemeType,
  type ThemeWallpaper,
} from "../common";
import type { PresencePayload } from "../presence"; // Theme types (we shouldn't export these individually, since we already do it in ui-core)

// Theme types (we shouldn't export these individually, since we already do it in ui-core)
type LinearGradient = `linear-gradient(${string})`;
type RadialGradient = `radial-gradient(${string})`;
type ConicGradient = `conic-gradient(${string})`;

type Gradient = LinearGradient | RadialGradient | ConicGradient;

type Hex = `#${string}`;
type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HSL = `hsl(${number}, ${number}%, ${number}%)`;
type HSLA = `hsla(${number}, ${number}%, ${number}%, ${number})`;
type HSV = `hsv(${number}, ${number}%, ${number}%)`;
type HSVA = `hsva(${number}, ${number}%, ${number}%, ${number})`;

type ColorLike = Hex | RGB | RGBA | HSL | HSLA | HSV | HSVA | Gradient;

type TypographyDisplayKey =
  | "display-xs"
  | "display-sm"
  | "display-md"
  | "display-lg";
type TypographyHeadingKey = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type TypographyTitleKey = "title-sm" | "title-md" | "title-lg";
type TypographyBodyKey = "body-xs" | "body-sm" | "body-md" | "body-lg";

type TypographyLevel =
  | TypographyBodyKey
  | TypographyTitleKey
  | TypographyHeadingKey
  | TypographyDisplayKey;

interface TypographyLevelObj {
  fontSize: number;
  lineHeight: string | number;
  fontWeight: string | number;
  letterSpacing: string | number;
}

// API Types
export type APIUserSettings = {
  currentTheme?: string | null;
  currentIcon?: string | null;
  preferredMode: AppMode;
  preferEmbossed: boolean;
  spacePositions: Snowflake[];

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

  lastSeenChangelogId?: Snowflake | null;

  updatedAt: Date;
};

export type APIChangelog = {
  id: Snowflake;
  title: string;
  body: string;
  imageUrl?: string | null;
  authorId: Snowflake;
  desktopVersion?: string | null;
  mobileVersion?: string | null;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type APIPrivateUser = {
  id: Snowflake;
  username: string;
  defaultAvatar: {
    type: number;
    color?: string | null;
    adapt?: boolean;
  };
  previousAvatars: string[];
  email: string;
  flags: bigint;
  globalName?: string | null;
  dateOfBirth: string;
  avatar?: string | null;
  accentColor: string;
  restrictedUntil?: Date | null;
  restrictionReason?: string | null;
  createdAt: Date;
  updatedAt: Date;
  presence?: PresencePayload;
};

export type APIReadState = {
  id: string;
  lastMessageId: string | null;
  lastAckedId: string | null;
  notificationsCursor: string | null;
  mentionCount: number;
  badgeCount: number;
  lastPinTimestamp: Date | null;
  flags: bigint;
  type: ReadStateType;
};

export type APISpacePartial = Pick<
  APISpace,
  "id" | "name" | "icon" | "description"
>;

export type APIMessageEmbed = {
  title?: string | null;
  description?: string;
  url?: string;
  color?: string;
  timestamp?: number;
  author?: {
    name: string;
    url?: string;
    iconUrl?: string;
  };
  footer?: {
    text: string;
    iconUrl?: string;
  };
  spotify?: {
    type: "track" | "album" | "artist" | "playlist";
    id: Snowflake;
    embedUrl: string;
  };
  youtube?: {
    videoId: string;
    embedUrl: string;
  };
  apple?: {
    id: Snowflake;
    type: "album" | "playlist" | "song" | "artist";
    embedUrl: string;
  };
  image?: string | null;
  media?: string | null;
  thumbnail?: string | null;
  spoiler?: boolean;
  type: EmbedType;
  post?: {
    id: Snowflake;
    authorId: Snowflake;
    author?: APIUser | null;
    content?: string | null;
    attachments?: APIAttachment[];
    hashtags?: APIHashtag[];
    createdAt: Date;
  } | null;
};

export type APICodedLink = {
  type: InviteType;
  code: string;
  space?: APISpacePartial | null;
  channel?: Pick<APIChannel, "id" | "name" | "type"> | null;
  user?: APIUser | null;
  inviter?: APIUser | null;
  approximateMemberCount?: number | null;
  approximatePresenceCount?: number | null;
  expiresAt?: Date | null;
};

export type APICodedLinkInput = Pick<APICodedLink, "type" | "code">;

export type APIUser = Omit<
  APIPrivateUser,
  | "email"
  | "settings"
  | "previousAvatars"
  | "dateOfBirth"
  | "restrictedUntil"
  | "restrictionReason"
>;

export type APIStaffAction = {
  id: Snowflake;
  action: StaffActionType;
  reason?: string | null;
  createdAt: Date;
  actor: {
    id: Snowflake;
    username: string;
    globalName?: string | null;
    avatar?: string | null;
  };
  target?: {
    id: Snowflake;
    username: string;
    globalName?: string | null;
    avatar?: string | null;
  } | null;
};

export type APIStaffSession = {
  sessionId: string;
  createdAt: number;
  lastUsedAt: number;
};

export type APIStaffNote = {
  id: Snowflake;
  content: string;
  createdAt: Date;
  author: {
    id: Snowflake;
    username: string;
    globalName?: string | null;
    avatar?: string | null;
  };
};

export type APIReport = {
  id: Snowflake;
  targetType: ReportTargetType;
  targetId: Snowflake;
  reason: ReportReason;
  description?: string | null;
  status: ReportStatus;
  createdAt: Date;
  reviewedAt?: Date | null;
  reporter: {
    id: Snowflake;
    username: string;
    globalName?: string | null;
    avatar?: string | null;
  };
  reviewedBy?: {
    id: Snowflake;
    username: string;
    globalName?: string | null;
    avatar?: string | null;
  } | null;
};

export type APIReportContentUser = {
  id: Snowflake;
  username: string;
  globalName?: string | null;
  avatar?: string | null;
};

export type APIReportMessageContent = {
  reported: APIMessage;
  context: APIMessage[];
  channelType: ChannelType;
  isDirectMessage: boolean;
};

export type APIReportPostContent = {
  post: APIPost;
};

export type APIReportCommentContent = {
  comment: APIPostComment;
};

export type APIReportUserContent = {
  user: APIReportContentUser;
};

export type APIReportSpaceContent = {
  space: Pick<
    APISpace,
    | "id"
    | "name"
    | "description"
    | "icon"
    | "ownerId"
    | "memberCount"
    | "flags"
    | "createdAt"
  > & {
    owner?: APIReportContentUser | null;
  };
};

export type APIReportContent =
  | { type: "message"; data: APIReportMessageContent }
  | { type: "post"; data: APIReportPostContent }
  | { type: "comment"; data: APIReportCommentContent }
  | { type: "user"; data: APIReportUserContent }
  | { type: "space"; data: APIReportSpaceContent }
  | { type: "unavailable"; message: string };

export type APIReportDetail = APIReport & {
  content: APIReportContent;
};

export type APIAppeal = {
  id: Snowflake;
  message: string;
  status: AppealStatus;
  staffResponse?: string | null;
  createdAt: Date;
  reviewedAt?: Date | null;
  user: {
    id: Snowflake;
    username: string;
    globalName?: string | null;
    avatar?: string | null;
  };
  space?: {
    id: Snowflake;
    name: string;
    icon?: string | null;
  } | null;
  reviewedBy?: {
    id: Snowflake;
    username: string;
    globalName?: string | null;
    avatar?: string | null;
  } | null;
};

export type APISupportUser = {
  id: Snowflake;
  username: string;
  globalName?: string | null;
  avatar?: string | null;
};

export type APISupportMessage = {
  id: Snowflake;
  body: string;
  isStaff: boolean;
  createdAt: Date;
  author: APISupportUser;
};

export type APISupportTicket = {
  id: Snowflake;
  category: SupportTicketCategory;
  subject: string;
  status: SupportTicketStatus;
  platform?: string | null;
  appVersion?: string | null;
  lastMessageAt: Date;
  createdAt: Date;
  closedAt?: Date | null;
  user: APISupportUser;
  assignedTo?: APISupportUser | null;
};

export type APISupportTicketDetail = APISupportTicket & {
  messages: APISupportMessage[];
};

export type APIChannelPermissionOverwrite = {
  channelId: Snowflake;
  spaceId: Snowflake;

  roleId?: Snowflake | null;
  userId?: Snowflake | null;

  allow: bigint;
  deny: bigint;

  createdAt: Date;
  updatedAt: Date;
};

export type APIHashtag = {
  id: Snowflake;
  tag: string;
};

export type APIPost = {
  id: Snowflake;

  authorId: Snowflake;
  author?: APIUser | null;

  content?: string | null;
  attachments?: APIAttachment[];

  hashtags?: APIHashtag[];
  embeds?: APIMessageEmbed[];
  expressionIds?: Snowflake[];
  expressions?: APIExpression[];

  likeCount?: number;
  saveCount?: number;
  shareCount?: number;
  commentCount?: number;

  liked?: boolean;
  saved?: boolean;
  shared?: boolean;

  scheduledFor?: Date | null;

  createdAt: Date;
  updatedAt?: Date;
};

export type APIPostComment = {
  id: Snowflake;

  postId: Snowflake;
  post?: APIPost | null;

  authorId: Snowflake;
  author?: APIUser | null;

  content: string;
  embeds?: APIMessageEmbed[];
  expressionIds?: Snowflake[];
  expressions?: APIExpression[];

  repliedToId?: Snowflake | null;

  edited: boolean;

  createdAt: Date;
  updatedAt?: Date;
};

export type APISpaceBan = {
  spaceId: Snowflake;
  userId: Snowflake;
  user?: APIUser;
  bannedById: Snowflake;
  bannedBy?: APIUser;
  reason: string;
  createdAt: Date;
};

export type APISpace = {
  id: Snowflake;
  name: string;
  ownerId: Snowflake;
  owner?: APIUser | null;
  flags: bigint;
  description?: string | null;
  icon?: string | null;
  themeId?: string | null;
  theme?: APITheme | null;
  vanityCode?: string | null;
  members?: APISpaceMember[] | null;
  channels?: APIChannel[] | null;
  roles?: APIRole[] | null;
  everyoneRoleId: Snowflake;
  memberCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type APIRole = {
  id: Snowflake;
  name: string;
  spaceId: Snowflake;
  space?: APISpace | null;
  color: string;
  allow: bigint;
  deny: bigint;
  position: number;
  hoist: boolean;
  flags: bigint;
  mentionable: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type APIMemberRole = {
  spaceId: Snowflake;
  userId: Snowflake;
  roleId: Snowflake;
  role?: APIRole | null;
};

export type APIInvite = {
  id: Snowflake;
  type: InviteType;

  code: string;

  spaceId?: Snowflake | null;
  space?: APISpace | null;

  channelId?: Snowflake | null;
  channel?: APIChannel | null;

  userId?: Snowflake | null;
  user?: APIUser | null;

  inviterId: Snowflake;
  inviter?: APIUser | null;

  maxUses: number;
  uses: number;

  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date | null;

  approximateMemberCount?: number | null;
  approximateActiveCount?: number | null;
};

export type APIExpression = {
  id: Snowflake;
  type: ExpressionType;
  name: string;
  assetHash: string;
  authorId: Snowflake;
  spaceId?: Snowflake | null;
  animated: boolean;
  flags: bigint;
  createdAt: Date;
};

export type APIChannel = {
  id: Snowflake;
  type: ChannelType;

  spaceId?: Snowflake | null;
  space?: APISpace | null;

  name?: string | null;

  ownerId?: Snowflake | null;
  owner?: APIUser | null;

  topic?: string | null;
  position: number;

  parentId?: Snowflake | null;
  parent?: APIChannel | null;

  recipientIds?: Snowflake[] | null;
  recipients?: APIUser[] | null;

  messages?: APIMessage[] | null;

  lastMessageId?: Snowflake | null;
  lastMessage?: APIMessage | null;

  nsfw: boolean;

  overwrites?: APIChannelPermissionOverwrite[] | null;

  flags: bigint;

  createdAt: Date;
  updatedAt: Date;

  icon?: string | null;
};

export type APIRelationship = {
  id: Snowflake;
  userId: Snowflake;
  otherUserId: Snowflake;
  type: RelationshipType;
  nickname: string | null;
  note: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type APIRelationshipWithUser = APIRelationship & {
  user?: APIUser | null;
  otherUser?: APIUser | null;
};

export type APIMessageMention = {
  type: MentionType;
  id: Snowflake;
};

export type APIMessageReactionEmoji =
  | { type: "unicode"; value: string }
  | { type: "expression"; expression: APIExpression };

export type APIMessageReaction = {
  emoji: APIMessageReactionEmoji;
  count: number;
  me: boolean;
};

export type APIMessageReactionEvent = {
  channelId: Snowflake;
  messageId: Snowflake;
  spaceId?: Snowflake | null;
  userId: Snowflake;
  user?: APIUser | null;
  emoji: APIMessageReactionEmoji;
  messageAuthorId?: Snowflake;
};

export type APIMessageReactionRemoveEvent = {
  channelId: Snowflake;
  messageId: Snowflake;
  spaceId?: Snowflake | null;
  userId: Snowflake;
  emoji: APIMessageReactionEmoji;
};

export type APIMessageReactionRemoveEmojiEvent = {
  channelId: Snowflake;
  messageId: Snowflake;
  spaceId?: Snowflake | null;
  emoji: APIMessageReactionEmoji;
};

export type APIMessageReactionRemoveAllEvent = {
  channelId: Snowflake;
  messageId: Snowflake;
  spaceId?: Snowflake | null;
};

export type APIAttachment = {
  id: Snowflake;
  filename: string;
  size: number;
  contentType: string;
  url: string;
  width?: number | null;
  height?: number | null;
};

export type APIMessage = {
  id: Snowflake;
  type: MessageType;

  channelId: Snowflake;
  channel?: APIChannel | null;

  spaceId?: Snowflake | null;
  space?: APISpace | null;

  content?: string | null;
  createdAt: Date;

  authorId: Snowflake;
  author?: APIUser | null;

  memberId?: Snowflake | null;
  member?: APISpaceMember | null;

  repliedToId?: Snowflake | null;
  repliedTo?: APIMessage | null;

  embeds?: APIMessageEmbed[];
  codedLinks?: APICodedLink[];
  expressionIds?: Snowflake[];
  expressions?: APIExpression[];
  attachments?: APIAttachment[];
  edited: boolean;
  flags: bigint;
  updatedAt?: Date;
  nonce?: Snowflake | null;
  mentions?: APIMessageMention[];
  reactions?: APIMessageReaction[];
};

export type APISpaceMember = {
  spaceId: Snowflake;
  space?: APISpace | null;

  userId: Snowflake;
  user?: APIUser | null;

  flags: bigint;
  nickname?: string | null;
  avatar?: string | null;
  banner?: string | null;

  roles?: APIMemberRole[];

  joinedAt: Date;
  updatedAt: Date;
};

export type APITheme = {
  id: Snowflake;
  name: string;
  description?: string | null;
  adaptive: boolean;
  type: ThemeType;
  style: ThemeStyle;
  colors: {
    common: {
      white: ColorLike;
      black: ColorLike;
    };

    // Base colors
    primary: ColorLike;
    neutral: ColorLike;
    background: ColorLike;
    surface: ColorLike;

    // Feedback colors
    danger: ColorLike;
    warning: ColorLike;
    info: ColorLike;
    success: ColorLike;
  };

  typography: {
    fontFamily: string;
    colors: {
      primary: ColorLike;
      secondary: ColorLike;
      accent: ColorLike;
      muted: ColorLike;
    };
    levels: Record<TypographyLevel, TypographyLevelObj>;
  };

  createdAt?: Date;
  updatedAt?: Date;

  backgroundImage?: string | null;
  wallpaper?: ThemeWallpaper | null;

  authorId?: Snowflake | null;
  author?: APIUser | null;
  spaceId?: Snowflake | null;
};

export type ProfileBlockType =
  | "header"
  | "text"
  | "image"
  | "music"
  | "links"
  | "activity"
  | "roles"
  | "mutual"
  | "divider"
  | "quote"
  | "draw"
  | "sticker"
  | "connections";

export interface ProfileLinkItem {
  label: string;
  url: string;
}

export interface ProfileLinksBlock extends ProfileBlockBase {
  type: "links";
  links: ProfileLinkItem[];
}

export interface ProfileActivityBlock extends ProfileBlockBase {
  type: "activity";
  showCustomStatus?: boolean;
}

export interface ProfileRolesBlock extends ProfileBlockBase {
  type: "roles";
  maxRoles?: number;
}

export interface ProfileConnectionsBlock extends ProfileBlockBase {
  type: "connections";
}

export interface ProfileMutualBlock extends ProfileBlockBase {
  type: "mutual";
  mode: "spaces" | "friends";
  maxItems?: number;
}

export type ProfileDividerStyle = "line" | "dotted" | "space";

export interface ProfileDividerBlock extends ProfileBlockBase {
  type: "divider";
  style?: ProfileDividerStyle;
}

export type ProfileQuoteVariant = "default" | "accent" | "warning";

export interface ProfileQuoteBlock extends ProfileBlockBase {
  type: "quote";
  content: string;
  variant?: ProfileQuoteVariant;
  attribution?: string | null;
}

export interface ProfileBlockBase {
  id: string;
  type: ProfileBlockType;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  cornerRadius?: number;
  backgroundColor?: string | null;
}

export interface ProfileHeaderBlock extends ProfileBlockBase {
  type: "header";
  bannerHeight?: number;
  bannerFocusY?: number;
}

export interface ProfileTextBlock extends ProfileBlockBase {
  type: "text";
  content: string;
}

export interface ProfileImageCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ProfileImageBlock extends ProfileBlockBase {
  type: "image";
  src: string;
  objectFit?: "cover" | "contain";
}

export interface ProfileMusicBlock extends ProfileBlockBase {
  type: "music";
  title?: string | null;
  artists?: string | null;
  image?: string | null;
  previewUrl?: string | null;
  trackUrl?: string | null;
  track?: APIProfileMusicSearchTrack | null;
  youtubeUrl?: string | null;
  audioHash?: string | null;
}

export interface ProfileDrawBlock extends ProfileBlockBase {
  type: "draw";
  svgData: string | null;
  paths: string | null;
  backgroundColor: string | null;
}

export interface ProfileStickerBlock extends ProfileBlockBase {
  type: "sticker";
  expressionId: string;
}

export type APIProfileBlock =
  | ProfileHeaderBlock
  | ProfileTextBlock
  | ProfileImageBlock
  | ProfileMusicBlock
  | ProfileLinksBlock
  | ProfileActivityBlock
  | ProfileRolesBlock
  | ProfileConnectionsBlock
  | ProfileMutualBlock
  | ProfileDividerBlock
  | ProfileQuoteBlock
  | ProfileDrawBlock
  | ProfileStickerBlock;

export type ProfileBlockSize = "s" | "m" | "l";

export interface MobileProfileBlockBase {
  id: string;
  type: ProfileBlockType;
  size: ProfileBlockSize;
  order: number;
  cornerRadius?: number;
  backgroundColor?: string | null;
}

export interface MobileProfileHeaderBlock extends MobileProfileBlockBase {
  type: "header";
  bannerHeight?: number;
  bannerFocusY?: number;
}

export interface MobileProfileTextBlock extends MobileProfileBlockBase {
  type: "text";
  content: string;
}

export interface MobileProfileImageBlock extends MobileProfileBlockBase {
  type: "image";
  src: string;
  objectFit?: "cover" | "contain";
  crop?: ProfileImageCrop | null;
}

export interface MobileProfileMusicBlock extends MobileProfileBlockBase {
  type: "music";
  title?: string | null;
  artists?: string | null;
  image?: string | null;
  previewUrl?: string | null;
  trackUrl?: string | null;
  track?: APIProfileMusicSearchTrack | null;
  youtubeUrl?: string | null;
  audioHash?: string | null;
}

export interface MobileProfileLinksBlock extends MobileProfileBlockBase {
  type: "links";
  links: ProfileLinkItem[];
}

export interface MobileProfileActivityBlock extends MobileProfileBlockBase {
  type: "activity";
  showCustomStatus?: boolean;
}

export interface MobileProfileRolesBlock extends MobileProfileBlockBase {
  type: "roles";
  maxRoles?: number;
}

export interface MobileProfileConnectionsBlock extends MobileProfileBlockBase {
  type: "connections";
}

export interface MobileProfileMutualBlock extends MobileProfileBlockBase {
  type: "mutual";
  mode: "spaces" | "friends";
  maxItems?: number;
}

export interface MobileProfileDividerBlock extends MobileProfileBlockBase {
  type: "divider";
  style?: ProfileDividerStyle;
}

export interface MobileProfileQuoteBlock extends MobileProfileBlockBase {
  type: "quote";
  content: string;
  variant?: ProfileQuoteVariant;
  attribution?: string | null;
}

export interface MobileProfileDrawBlock extends MobileProfileBlockBase {
  type: "draw";
  svgData: string | null;
  paths: string | null;
  backgroundColor: string | null;
}

export interface MobileProfileStickerBlock extends MobileProfileBlockBase {
  type: "sticker";
  expressionId: string;
}

export type APIMobileProfileBlock =
  | MobileProfileHeaderBlock
  | MobileProfileTextBlock
  | MobileProfileImageBlock
  | MobileProfileMusicBlock
  | MobileProfileLinksBlock
  | MobileProfileActivityBlock
  | MobileProfileRolesBlock
  | MobileProfileConnectionsBlock
  | MobileProfileMutualBlock
  | MobileProfileDividerBlock
  | MobileProfileQuoteBlock
  | MobileProfileDrawBlock
  | MobileProfileStickerBlock;

export type APIProfileMusicTrackRef = {
  source: "itunes" | "deezer";
  id: string;
};

export type APIProfileMusicSearchTrack = {
  source: "itunes" | "deezer";
  id: string;
  name: string;
  artists: string;
  image?: string | null;
  previewUrl?: string | null;
  trackUrl: string;
};

export type APIProfileMusic = {
  url: string;
  title?: string | null;
  image?: string | null;
  authorName?: string | null;
  audioHash?: string | null;
  previewUrl?: string | null;
  musicTrack?: APIProfileMusicTrackRef | null;
  spotify?: APIMessageEmbed["spotify"];
  youtube?: APIMessageEmbed["youtube"];
  apple?: APIMessageEmbed["apple"];
};

export type APIUserProfile = {
  userId: Snowflake;
  configured: boolean;
  backgroundColor?: string | null;
  backgroundImage?: string | null;
  banner?: string | null;
  bio?: string | null;
  pageFontFamily?: string | null;
  profileMusic?: APIProfileMusic | null;
  blocks: APIProfileBlock[];
  mobileBlocks: APIMobileProfileBlock[];
  updatedAt: Date;
};
