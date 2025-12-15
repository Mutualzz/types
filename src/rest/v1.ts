import type { Snowflake } from "../common";

export const HttpStatusCode = {
    NotFound: 404,
    Created: 201,
    Conflict: 409,
    BadRequest: 400,
    Success: 200,
    Unauthorized: 401,
    InternalServerError: 500,
    Forbidden: 403,
    RateLimit: 429,
    NoContent: 204,
} as const;

export interface RESTSession {
    sessionId: string;
    userId: string;
    createdAt: number;
    lastUsedAt: number;
}

export type Sizes = 16 | 32 | 64 | 128 | 256 | 512 | 1024;

export const CDNRoutes = {
    defaultUserAvatar(
        id: number | string,
        version: "dark" | "light" = "light",
        size: Sizes = 128,
        format: AvatarFormat = ImageFormat.WebP,
    ) {
        const params = new URLSearchParams();

        if (format) params.set("format", format);
        if (size) params.set("size", size.toString());
        if (version) params.set("version", version);

        const query = params.toString();
        return `/defaultAvatars/${id}.png${query ? `?${query}` : ""}` as const;
    },

    userAvatar(
        userId: Snowflake,
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
        spaceId: Snowflake,
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
