export const HttpStatusCode = {
    NotFound: 404,
    Created: 201,
    Conflict: 409,
    BadRequest: 400,
    Success: 200,
    Unauthorized: 401,
    InternalServerError: 500,
    Forbidden: 403,
} as const;

export interface RESTSession {
    sessionId: string;
    userId: string;
    createdAt: number;
    lastUsedAt: number;
}

export const defaultAvatars = [
    "cat",
    "dog",
    "dragon",
    "fox",
    "hyena",
    "rabbit",
    "raccoon",
    "wolf",
] as const;

export type ThemeType = "light" | "dark";
export type ThemeStyle = "normal" | "gradient";
export type AppMode = "spaces" | "feed";

export type Sizes = 16 | 32 | 64 | 128 | 256 | 512 | 1024;

export type DefaultAvatar = (typeof defaultAvatars)[number];

export const CDNRoutes = {
    defaultUserAvatar(id: DefaultAvatar) {
        return `/defaultAvatars/${id}.png` as const;
    },

    userAvatar(
        userId: string,
        hash: string,
        format: AvatarFormat,
        size: Sizes = 128,
        animated = true,
    ) {
        const params = new URLSearchParams();

        if (format) params.set("format", format);
        if (size) params.set("size", size.toString());
        if (animated) params.set("animated", "true");

        const query = params.toString();
        return `/avatars/${userId}/${hash}.${format}${query ? `?${query}` : ""}` as const;
    },

    spaceIcon(
        spaceId: string,
        hash: string,
        format: SpaceFormat,
        size: Sizes = 128,
        animated = true,
    ) {
        const params = new URLSearchParams();

        if (format) params.set("format", format);
        if (size) params.set("size", size.toString());
        if (animated) params.set("animated", "true");

        const query = params.toString();
        return `/spaces/${spaceId}/icons/${hash}.${format}${query ? `?${query}` : ""}` as const;
    },
};

export type AvatarFormat = Exclude<ImageFormat, ImageFormat.Lottie>;
export type SpaceFormat = Exclude<ImageFormat, ImageFormat.Lottie>;

export enum ImageFormat {
    JPEG = "jpeg",
    PNG = "png",
    WebP = "webp",
    GIF = "gif",
    Lottie = "json",
}

export class HttpException extends Error {
    readonly status: number;
    readonly message: string;
    readonly errors: { path: string; message: string }[];

    constructor(
        status: number,
        message: string,
        errors?: { path: string; message: string }[],
    ) {
        super(message);
        this.status = status;
        this.message = message;
        this.errors = errors ?? [];
    }
}
