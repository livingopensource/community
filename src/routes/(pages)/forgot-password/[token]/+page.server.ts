import { User } from "$lib/server/databases/pg/users";
import { redirect } from "@sveltejs/kit"
import bcrypt from 'bcrypt';

export async function load(event) {
    if (event.cookies.get("losf") != null) {
        throw redirect(302, "/dash")
    }
}

export const actions = {
    default: async ({ request, params }) => {
        const data = await request.formData();
        const token = params.token;
        const password = data.get('password');
        if (!password || typeof password !== 'string') {
            return {
                status: 400,
                body: {
                    message: "Invalid password provided."
                }
            }
        }
        try {
            const user = await User.getByToken(token);
            if (user) {
                const userDetails = user.toJSON();
                const valid = await bcrypt.compare(password, userDetails.password);
                if (valid) {
                    return {
                        status: 400,
                        body: {
                            message: "Password cannot be the same as the old password."
                        }
                    }
                }
                if (userDetails.resetTokenExpires < new Date()) {
                    return {
                        status: 400,
                        body: {
                            message: "Password reset token has expired. Please re-start the password reset process"
                        }
                    }
                }
                const hashedPassword = await bcrypt.hashSync(password, 10);
                await user.update({
                    password: hashedPassword
                });
            } else {
                return {
                    status: 400,
                    body: {
                        message: "Password reset failed. Please re-start the password reset process"
                    }
                }
            }
        } catch(err) {
            console.log(err)
            return {
                status: 400,
                body: {
                    message: "Password reset failed."
                }
            }
        }
		return {
			status: 200,
			body: {
				message: "Password reset successful."
			}
		}
    }}