import prisma from "$lib/server/databases/prisma";


export async function userPaidSubscriptions(email: string) {
    return await prisma.users.findUnique({
        where: {
            email: email,
        },
        include: {
            subscriptions: {
                where: {
                    paid: true
                }
            }
        }
    })
}

export async function userSubscriptions(email: string) {
    return await prisma.users.findUnique({
        where: {
            email: email,
        },
        include: {
            subscriptions: true
        }
    })
}