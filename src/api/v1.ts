import type { DefaultAvatar, ThemeStyle, ThemeType } from "../rest/v1";

export type APIUserSettings = {
    currentTheme: APITheme;
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
    themes: APITheme[];
    settings: APIUserSettings;
    createdTimestamp: number;
    createdAt: Date;
};

export type APIUser = Omit<
    APIPrivateUser,
    "email" | "settings" | "previousAvatars" | "dateOfBirth"
>;

export type APITheme = {
    id: string;
    name: string;
    description: string;
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
        colors: {
            primary: ColorLike;
            secondary: ColorLike;
            accent: ColorLike;
            muted: ColorLike;
        };
    };

    createdAt: Date;
    createdTimestamp: number;
    updatedAt: Date;
    updatedTimestamp: number;

    createdBy?: APIUser;
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
