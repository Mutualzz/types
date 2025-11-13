import type { AppMode, DefaultAvatar, ThemeStyle, ThemeType } from "../rest/v1";

export type APIUserSettings = {
    currentTheme: string;
    preferredMode: AppMode;
    spacePositions: string[];
};

export type APIPrivateUser = {
    id: string;
    username: string;
    defaultAvatar: DefaultAvatar;
    previousAvatars: string[];
    email: string;
    flags: bigint;
    globalName?: string | null;
    dateOfBirth: string;
    avatar?: string | null;
    accentColor: string;
    created: Date;
    updated: Date;
};

export type APIUser = Omit<
    APIPrivateUser,
    "email" | "settings" | "previousAvatars" | "dateOfBirth"
>;

export type APISpace = {
    id: string;
    name: string;
    owner: string;
    flags: bigint;
    description?: string | null;
    icon?: string | null;
    created: Date;
    updated: Date;
};

export type APIRole = {
    id: string;
    name: string;
    space: string;
    color: string;
    permissions: bigint;
    position: number;
    hoist: boolean;
    flags: bigint;
    mentionable: boolean;
    created: Date;
    updated: Date;
};

export type APISpaceMember = {
    space: string;
    user: string;
    flags: bigint;
    nickname?: string | null;
    avatar?: string | null;
    banner?: string | null;
    roles: string[];
    joined: Date;
    updated: Date;
};

export type APITheme = {
    id: string;
    name: string;
    description: string;
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

    created: Date;
    updated: Date;

    author?: string | null;
};
