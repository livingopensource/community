import prisma from "$lib/server/databases/prisma";

export async function memberships() {
    return await prisma.membership.findMany();
}

export async function membershipByID(id: string) {
    return await prisma.membership.findUnique({
        where: {
            id: id
        }
    })
}