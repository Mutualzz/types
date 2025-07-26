const GatewayOpcodes = {
    Dispatch: 0,
    Heartbeat: 1,
    Identify: 2,
    Resume: 3,
    Reconnect: 4,
    InvalidSession: 5,
    Hello: 6,
    HeartbeatAck: 7,
    System: 8
};
const HttpStatusCode = {
    NotFound: 404,
    Created: 201,
    Conflict: 409,
    BadRequest: 400,
    Success: 200,
    Unauthorized: 401,
    InternalServerError: 500,
    Forbidden: 403
};

export { GatewayOpcodes, HttpStatusCode };
