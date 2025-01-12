import { z } from "zod";

/**
 * User Schema using Zod
 */
export const ZUser = z.object({
    id: z.string(),
    username: z.string(),
});

/**
 * User with sensitive data Schema using Zod
 */
export const ZUserWithSensitiveData = ZUser.extend({
    email: z.string(),
    password: z.string(),
});

/**
 * User type infered from Zod schema
 */
export type User = z.infer<typeof ZUser>;

/**
 * User with sensitive data type infered from Zod schema
 */
export type UserWithSensitiveData = z.infer<typeof ZUserWithSensitiveData>;
