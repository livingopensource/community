import prisma from "$lib/server/databases/prisma";

export async function userData(email: string) {
    return await prisma.user.findUnique({
        where: {
            email: email,
        }
    })
}