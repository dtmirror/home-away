'use server'

import { profileSchema } from "./schemas";
import db from './db';
import { auth, clerkClient, currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProfileAction(prevState: any, formData: FormData): Promise<{ message: string }> {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User not found');

        const rawData = Object.fromEntries(formData);
        const validatedFields = profileSchema.parse(rawData);

        console.log('validatedFields', validatedFields);

        await db.profile.create({
            data: {
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
                profileImage: user.imageUrl ?? '',
                ...validatedFields,
            }
        });

        await clerkClient.users.updateUserMetadata(user.id, {
            privateMetadata: {
                hasProfile: true,
            }
        });

        redirect('/');
    } catch (error) {
        console.error(error);
        return { message: error instanceof Error ? error.message : 'An unknown error occurred' };
    }
}