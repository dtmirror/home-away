import * as z from 'zod';
import { ZodSchema } from 'zod';

export const profileSchema = z.object({
    firstName:z.string()
        .min(2, {message: 'First name must be more than 20 characters'})
        .max(20, {message: 'First name must be less than 20 characters'}),
    lastName:z.string()
        .min(2, {message: 'Last name must be more than 20 characters'})
        .max(20, {message: 'Last name must be less than 20 characters'}),
    username:z.string()
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

export const imageSchema = z.object({
    image: validateFile()
});

function validateFile() {
    const maxUploadSize = 1024 * 1024; // 1MB
    const acceptedFileTypes = ['image/'];

    return z
        .instanceof(File)
        .refine((file) => {
            return !file || file.size <= maxUploadSize
        }, 'File size must be less than 1MB')
        .refine((file) => {
            return !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
        }, 'File must be an image');
}