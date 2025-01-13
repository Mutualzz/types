declare module "@mutualzz/types" {
    export type User = {
        id: string;
        username: string;
        globalName?: string;
        dateOfBirth: Date;
    };

    export type UserWithSensitiveData = User & {
        email: string;
        password: string;
    };
}
