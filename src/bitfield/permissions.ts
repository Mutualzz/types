export const permissionFlags = {
    ViewChannel: 1n << 0n,
    SendMessages: 1n << 1n,
    ManageMessages: 1n << 2n,
    ManageRoles: 1n << 3n,
    KickMembers: 1n << 4n,
    BanMembers: 1n << 5n,

    Administrator: 1n << 60n,
} as const satisfies Record<string, bigint>;

export type PermissionFlag = keyof typeof permissionFlags;
export type PermissionFlags = typeof permissionFlags;
