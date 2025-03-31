declare module "@mutualzz/types" {
    export type User = {
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
}
