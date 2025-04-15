import prisma from "$lib/server/databases/prisma"

export async function load() {
    return {
        memberships: await prisma.membership.findMany()
    }
}