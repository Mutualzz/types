export type APIUserSettings = {
    currentTheme: APITheme;
};

export type APIUser = {
    id: string;
    username: string;
    globalName?: string;
    email?: string;
    themes?: APITheme[];
    settings: APIUserSettings;
    createdTimestamp: number;
    createdAt: Date;
};

export type APITheme = {
    id: string;
    name: string;
    description: string;
    type: "light" | "dark";
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

type ColorLike = Hex | RGB | RGBA | HSL | HSLA;
