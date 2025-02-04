import * as z from 'zod';
import { ZodSchema } from 'zod';

export const profileSchema = z.object({
    firstName:z.string()
        .min(2, {message: 'First name must be more than 20 characters'})
        .max(20, {message: 'First name must be less than 20 characters'}),
    lastName:z.string().max(20, {message: 'Last name must be less than 20 characters'}),
    userName:z.string().max(20, {message: 'User name must be less than 20 characters'}),
});