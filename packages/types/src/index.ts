

import {z} from 'zod';

export const signUpBody= z.object({
    username:z.string(),
    email: z.email(),
    password: z.string()
})

export const signInBody= z.object({
    username:z.union([z.string(),z.email()]),
    password:z.string()
})