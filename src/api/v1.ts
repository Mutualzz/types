import type {
    AppMode,
    ChannelType,
    InviteType,
    MessageType,
    Snowflake,
    ThemeStyle,
    ThemeType,
} from "../common";

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
    spacePositions: Snowflake[];
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
    createdAt: Date;
    updatedAt: Date;
};

export type APISpacePartial = Pick<
    APISpace,
    "id" | "name" | "icon" | "description"
>;

export type APIMessageEmbed = {
    title?: string;
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
    image?: string;
    media?: string;
    thumbnail?: string;
};

export type APIUser = Omit<
    APIPrivateUser,
    "email" | "settings" | "previousAvatars" | "dateOfBirth"
>;

export type APISpace = {
    id: Snowflake;
    name: string;
    ownerId: Snowflake;
    owner?: APIUser | null;
    flags: bigint;
    description?: string | null;
    icon?: string | null;
    vanityCode?: string | null;
    members?: APISpaceMember[] | null;
    channels?: APIChannel[] | null;
    roles?: APIRole[] | null;
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
    permissions: bigint;
    position: number;
    hoist: boolean;
    flags: bigint;
    mentionable: boolean;
    createdAt: Date;
    updatedAt: Date;
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

    recipientIds?: Snowflake[];
    recipients?: APIUser[];

    messages?: APIMessage[] | null;

    lastMessageId?: Snowflake | null;
    lastMessage?: APIMessage | null;

    nsfw: boolean;

    flags: bigint;

    createdAt: Date;
    updatedAt: Date;
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

    embeds: APIMessageEmbed[];
    edited: boolean;
    updatedAt?: Date;
    nonce?: Snowflake | null;
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

    roles?: APIRole[];

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

    createdAt: Date;
    updatedAt: Date;

    authorId?: Snowflake | null;
    author?: APIUser | null;
};
