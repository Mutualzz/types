export enum ChannelType {
    Text = 0,
    Voice = 1,
    Category = 2,
    DM = 3,
    GroupDM = 4,
}

export enum ExpressionType {
    Emoji = 0,
    Sticker = 1,
}

export enum ReadStateType {
    Messages = 0,
    Acks = 1,
    NotificationCenter = 2,
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

export enum RelationshipType {
    Friend = 0,
    Blocked = 1,
    IncomingRequest = 2,
    OutgoingRequest = 3,
}

export type MentionType = "user" | "role" | "everyone" | "here";
export type EmbedType = "rich" | "gifv" | "post";

export type ThemeType = "light" | "dark";
export type ThemeStyle = "normal" | "gradient";
export type AppMode = "spaces" | "feed" | "@me";

export type Snowflake = string;
