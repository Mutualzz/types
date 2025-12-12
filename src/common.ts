export enum ChannelType {
    Text = 0,
    Voice = 1,
    Category = 2,
    DM = 3,
    GroupDM = 4,
}

export enum MessageType {
    Default = 0,
    Reply = 1,
    System = 2,
    Unhandled = 255,
}

export enum InviteType {
    Space = 0,
    Friend = 1,
}

export type ThemeType = "light" | "dark";
export type ThemeStyle = "normal" | "gradient";
export type AppMode = "spaces" | "feed";

export type Snowflake = string;
