import { env } from '$env/dynamic/private';
import { Session, User } from '$lib/server/databases/pg/users';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import bcrypt from 'bcrypt';
import ValidationError from 'sequelize/lib/errors/validation-error';

export async function load(event) {
    if (event.cookies.get("losf") != null) {
        throw redirect(302, "/dash")
    }
}

export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');
		if (typeof email === 'string' && typeof password === 'string') {
			const user = await User.getByEmail(email);
			if (user) {
				const userDetails = user.toJSON();
				const valid = await bcrypt.compare(password, userDetails.password);
				if (valid) {
					try {
						const session = await Session.create({
							UserId: userDetails.id
						})
						const sessionId = session.toJSON().id;
						if (sessionId) {
							cookies.set('losf', sessionId, {
								path: '/',
								sameSite: 'strict',
								httpOnly: true,
								secure: env.ENV == 'production',
								maxAge: Number(env.SessionTTL)
							})
							const refererURL = request.headers.get("referer");
							if (refererURL) {
								const urlParams = new URLSearchParams(refererURL.split('?')[1]);
								const path = urlParams.get('redirect');

								if (path != null) {
									return redirect(302, path);
								}
							}
							return redirect(302, "/dash");
						}
						return {
							status: 400,
							body: {
								messages: ['Login failed'],
								email: email
							}
						}
					} catch(err: unknown) {
						if (err instanceof ValidationError) {
							return {
								status: 400,
								body: {
									messages: ['Login failed.'],
									errors: err.errors.map((error) => ({
										field: error.path,
										message: error.message,
										name: error.value
									})),
									email: email
								}
							}
						}
						throw err;
					}
				}
				return {
					status: 400,
					body: {
						messages: ['Login failed'],
						email: email
					}
				}
			}
		}
		return {
			status: 400,
			body: {
				messages: ['Login failed'],
				email: email
			}
		}
	}
} satisfies Actions;