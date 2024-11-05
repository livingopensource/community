import { User } from '$lib/server/databases/pg/users';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';
import MailTemplate from '$lib/emails/template.svelte';
import { render } from 'svelte/server';

export async function load(event) {
    if (event.cookies.get("losf") != null) {
        throw redirect(302, "/dash")
    }
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email');
		if (typeof email === 'string') {
			const user = await User.getByEmail(email);
			if (user) {
				const userDetails = user.toJSON();
				const transporter = nodemailer.createTransport({
					host: env.EMAIL_HOST,
					port: Number(env.EMAIL_PORT),
					secure: Boolean(env.EMAIL_SSL),
					auth: {
						user: env.EMAIL_ADDR,
						pass: env.EMAIL_PASS
					},
                    tls: {
                        rejectUnauthorized: Boolean(env.EMAIL_SSL_VERIFY)
                    }
				});
				const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
				try {
					await user.update({
						resetToken: resetToken,
						resetTokenExpires: new Date(Date.now() + 1000 * 60 * 30)
					});
				} catch(error) {
					console.log(error)
					return {
						status: 400,
						body: {
							message: 'Unable to generate the token. Please try again later.'
						}
					}
				}
				const content  = `
				<p> We recived a request to reset your password. If you did not request this, please ignore this email.</p>
				<br />
				<p> Click the link below to reset your password. </p>
				<br />
				<a href="${env.BASE_URL}/forgot-password/${resetToken}">Reset Password</a>
				`;

				const options = {
					from: env.EMAIL_ADDR,
					to: userDetails.email,
					subject: 'Reset Your Password',
					html: render(MailTemplate, { props: { name: userDetails.firstName, content: content } }).body
				};
				
				await transporter.sendMail(options);
				
				return {
					status: 200,
					body: {
						messages: ["We've sent you an email with instructions to reset your password."],
						email: email
					}
				}
			} else {
				return {
					status: 400,
					body: {
						messages: ["We'll send you an email to reset your password, if you have an account with us."],
						email: email
					}
				}
			}
		} else {
			return {
				status: 400,
				body: {
					messages: ["Please provide a valid email address."],
					email: email
				}
			}
		}
	}} satisfies Actions;