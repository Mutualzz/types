export type Session = {
    userId: string | null;
    seq: number;
    updatedAt: number;
    lastUsedAt: number;
};

export * from "./api/v1";
export * from "./gateway/v1";
export * from "./rest/v1";
