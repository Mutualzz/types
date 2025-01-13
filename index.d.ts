declare module "@mutualzz/types" {
    export type User = {
        id: string;
        username: string;
        globalName?: string;
        dateOfBirth: Date;
        createdTimestamp: number;
        createdAt: Date;
        updatedTimestamp: number;
        updatedAt: Date;
    };

    export type UserWithSensitiveData = User & {
        email: string;
        password: string;
        privateKey: string;
    };
}
