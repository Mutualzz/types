import { z } from "zod";

export const ZUser = z.object({
    id: z.string(),
    username: z.string(),
});

export const ZUserWithSensitiveData = ZUser.extend({
    email: z.string(),
    password: z.string(),
});

export type User = z.infer<typeof ZUser>;
export type UserWithSensitiveData = z.infer<typeof ZUserWithSensitiveData>;
