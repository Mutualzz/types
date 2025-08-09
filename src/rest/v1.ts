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
