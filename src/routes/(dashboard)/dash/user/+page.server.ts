import { Session } from "$lib/server/databases/pg/users";
import bcrypt from 'bcrypt';

export const actions = {
	default: async ({ cookies, request }) => {
        const losfCookie = cookies.get("losf");
        if (losfCookie == null) {
           return {
            status: 400,
            body: {
                message: 'Invalid session'
            }
          }
        }
        const user = await Session.getUser(losfCookie);
        if (user == null) {
          return {
            status: 400,
            body: {
                message: 'Invalid session'
            }
          }
        }
        const data = await request.formData()
        const currentPassword = data.get("current-password")
        const newPassword = data.get("password")

        if (typeof currentPassword !== 'string' || typeof newPassword !== 'string') {
            return {
                status: 400,
                body: {
                    message: 'Invalid password'
                }
            }
        }

        const valid = await bcrypt.compare(currentPassword, user.toJSON().User.password);
        if (!valid) {
            return {
                status: 400,
                body: {
                    message: 'Invalid password'
                }
            }
        }
        try {
            const hashedPassword = await bcrypt.hashSync(newPassword, 10);
                await user.update({
                    password: hashedPassword
                });
        } catch(err) {
            console.error(err);
            return {
                status: 400,
                body: {
                    message: 'Invalid password'
                }
            }
        }

        return {
            status: 200,
            body: {
                message: 'Password changed'
            }
        }

    }
}