import type { AppMode, DefaultAvatar, ThemeStyle, ThemeType } from "../rest/v1";

export type APIUserSettings = {
    currentTheme: string;
    preferredMode: AppMode;
};

export type APIPrivateUser = {
    id: string;
    username: string;
    defaultAvatar: DefaultAvatar;
    previousAvatars: string[];
    globalName?: string;
    dateOfBirth: Date;
    avatar?: string;
    email?: string;
    accentColor: Hex;
    settings: APIUserSettings;
    createdAt: Date;
    createdTimestamp: number;
    updatedAt: Date;
    updatedTimestamp: number;
};

export type APIUser = Omit<
    APIPrivateUser,
    "email" | "settings" | "previousAvatars" | "dateOfBirth"
>;

export type APISpace = {
    id: string;
    name: string;
    ownerId: string;
    description?: string;
    icon?: string;
    createdAt: Date;
    createdTimestamp: number;
    updatedAt: Date;
    updatedTimestamp: number;
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
            white: Hex;
            black: Hex;
        };

        // Base colors
        primary: Hex;
        neutral: Hex;
        background: ColorLike;
        surface: ColorLike;

        // Feedback colors
        danger: Hex;
        warning: Hex;
        info: Hex;
        success: Hex;
    };

    typography: {
        colors: {
            primary: Hex;
            secondary: Hex;
            accent: Hex;
            muted: Hex;
        };
    };

    createdAt: Date;
    createdTimestamp: number;
    updatedAt: Date;
    updatedTimestamp: number;

    createdBy?: string;
};

// For now
type Hex = `#${string}`;
type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HSL = `hsl(${number}, ${number}%, ${number}%)`;
type HSLA = `hsla(${number}, ${number}%, ${number}%, ${number})`;

type LinearGradient = `linear-gradient(${string})`;
type RadialGradient = `radial-gradient(${string})`;
type ConicGradient = `conic-gradient(${string})`;

type Gradient = LinearGradient | RadialGradient | ConicGradient;

type ColorLike = Hex | RGB | RGBA | HSL | HSLA | Gradient;
