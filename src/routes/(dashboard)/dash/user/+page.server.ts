import { redirect } from '@sveltejs/kit';
import prisma from "$lib/server/databases/prisma"
import { fail } from 'assert';

export const actions = {
	default: async ({ request, locals }) => {
        const session = await locals.auth()
        if (!session?.user) redirect(302, "/signin")

        if (!session.user.email) fail("Unable to get user email address")
        
        const data = await request.formData();
        const name = data.get("name")?.toString()

        if (!name) return fail(400, {
            message: "Name is required"
        })

        const user = await prisma.user.update({
            where: {
                email: session.user.email
            },
            data: {
                name: name
            }
        })

        if (user.id == null) return {
            status: 400,
            body: {
                message: "unable to update user details"
            }
        }

        return {
            status: 200,
            body: {
                message: 'Name updated'
            }
        }

    }
}