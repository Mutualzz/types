import type {
    AppMode,
    ChannelType,
    InviteType,
    MessageType,
    Snowflake,
    ThemeStyle,
    ThemeType,
} from "../common";

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
            white: string;
            black: string;
        };

        // Base colors
        primary: string;
        neutral: string;
        background: string;
        surface: string;

        // Feedback colors
        danger: string;
        warning: string;
        info: string;
        success: string;
    };

    typography: {
        colors: {
            primary: string;
            secondary: string;
            accent: string;
            muted: string;
        };
    };

    createdAt: Date;
    updatedAt: Date;

    authorId?: Snowflake | null;
    author?: APIUser | null;
};
