import { Session, User } from '$lib/server/databases/pg/users';
import { ValidationError } from 'sequelize';
import { env } from '$env/dynamic/private';
import bcrypt from 'bcrypt';

// Add a declaration for the 'bcrypt' module
declare module 'bcrypt';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export async function load(event) {
    if (event.cookies.get("losf") != null) {
        throw redirect(302, "/dash")
    }
}

export const actions = {
    default: async({ request, cookies }) => {
        const formData = await request.formData()
        const password = formData.get("password")
        if (typeof password !== 'string') {
            throw new Error('Password must be a string')
        }
        const hash = bcrypt.hashSync(password, 10)
        try {
            const result = await User.create({
                firstName: formData.get("name")?.toString().split(" ")[0],
                lastName:  formData.get("name")?.toString().split(" ")[1],
                email: formData.get("email")?.toString(),
                password: hash
             })
             const refererURL = request.headers.get("referer");
             if (result.get("id") != null) {
                 const session = await Session.create({
                     userId: result.get("id")
                 })
                 if (session.get("id") == null) {
                    throw new Error('Session creation failed')
                 }
                 const sessionId = session.get("session");
                 if (typeof sessionId !== 'string') {
                     throw new Error('Session ID must be a string');
                 }
                 cookies.set('losf', sessionId, {
                     path: '/',
                     httpOnly: true,
                     sameSite: 'strict',
                     secure: env.ENV == 'production',
                     maxAge: Number(env.SessionTTL)
                 })
                 if (refererURL != null) {
                     const urlParams = new URLSearchParams(refererURL.split('?')[1]);
                     const path = urlParams.get('redirect');
                     return redirect(302, path || '/dash/membership')
                 }
                 return redirect(302, '/dash/membership')
             }
        } catch(err: unknown) {
            if (err instanceof ValidationError) {
                return {
                    status: 400,
                    body: {
                        message: 'Registration failed',
                        errors: err.errors.map((error) => ({
                            field: error.path,
                            message: error.message,
                            name: error.value
                        })),
                        name: formData.get("name")?.toString(),
                        email: formData.get("email")?.toString()
                    }
                }
            }
            throw err;
        }
        return {
            status: 400,
            body: {
                message: 'Registration failed',
                name: formData.get("name")?.toString(),
                email: formData.get("email")?.toString()
            }
        }
    }} satisfies Actions;
