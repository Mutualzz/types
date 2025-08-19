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

export type DefaultAvatar = (typeof defaultAvatars)[number];

export const CDNRoutes = {
    defaultUserAvatar(id: DefaultAvatar) {
        return `/defaultAvatars/${id}.png` as const;
    },

    userAvatar(userId: string, userAvatar: string, format: AvatarFormat) {
        return `/avatars/${userId}/${userAvatar}.${format}` as const;
    },
};

export type AvatarFormat = Exclude<ImageFormat, ImageFormat.Lottie>;

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
