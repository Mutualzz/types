declare const GatewayOpcodes: {
    readonly Dispatch: 0;
    readonly Heartbeat: 1;
    readonly Identify: 2;
    readonly Resume: 3;
    readonly Reconnect: 4;
    readonly InvalidSession: 5;
    readonly Hello: 6;
    readonly HeartbeatAck: 7;
    readonly System: 8;
};
declare const HttpStatusCode: {
    readonly NotFound: 404;
    readonly Created: 201;
    readonly Conflict: 409;
    readonly BadRequest: 400;
    readonly Success: 200;
    readonly Unauthorized: 401;
    readonly InternalServerError: 500;
    readonly Forbidden: 403;
};
type User = {
    id: string;
    username: string;
    displayName?: string;
    email?: string;
    dateOfBirth: Date;
    createdTimestamp: number;
    createdAt: Date;
    updatedTimestamp: number;
    updatedAt: Date;
};

export { GatewayOpcodes, HttpStatusCode };
export type { User };
