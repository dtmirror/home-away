import * as z from 'zod';
import { ZodSchema } from 'zod';

export const profileSchema = z.object({
    firstName:z.string()
        .min(2, {message: 'First name must be more than 20 characters'})
        .max(20, {message: 'First name must be less than 20 characters'}),
    lastName:z.string()
        .min(2, {message: 'Last name must be more than 20 characters'})
        .max(20, {message: 'Last name must be less than 20 characters'}),
    userName:z.string()
        .min(2, {message: 'User name must be more than 20 characters'})
        .max(20, {message: 'User name must be less than 20 characters'}),
});

export function validateWithZodSchema<T>(schema: ZodSchema, data: unknown):T {
    const result = schema.safeParse(data);

    if (!result.success) {
        const errors = result.error.errors.map((error) => error.message);
        throw new Error(errors.join(', '));
    }

    return result.data as T;
}