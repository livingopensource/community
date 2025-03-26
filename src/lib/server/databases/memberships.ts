import prisma from "$lib/server/databases/prisma";

export async function memberships() {
    return await prisma.membership.findMany();
}