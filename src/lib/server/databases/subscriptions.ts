import prisma from "$lib/server/databases/prisma";


export async function userPaidSubscriptions(email: string) {
    return await prisma.user.findUnique({
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
    return await prisma.user.findUnique({
        where: {
            email: email,
        },
        include: {
            subscriptions: {
                include: {
                    memberships: true
                }
            }
        }
    })
}

export async function subscriptionByID(id: string) {
    return await prisma.subscription.findUnique({
        where: {
            id: id
        }
    })
}

export async function subscriptionByTransactionId(transactionId: string) {
    return await prisma.subscription.findFirst({
        where: {
            transactionId: transactionId
        }
    })
}

export async function createSubscription(userId: string, membershipId: string, amount: number, currency: string, paymentMethod: string, transactionId: string, status: string, reason: string) {
    return await prisma.subscription.create({
        data: {
            UserId: userId,
            MembershipId: membershipId,
            amount: amount,
            currency: currency,
            paymentMethod: paymentMethod,
            transactionId: transactionId,
            status: status,
            reason: reason
        }
    })
}

export async function updateSubscription(id: string, status: string, reason: string, externalTransactionId: string) {
    return await prisma.subscription.update({
        where: {
            id: id
        },
        data: {
            status: status,
            reason: reason,
            externalTransactionId: externalTransactionId
        }
    })
}

export async function pendingSubscriptions() {
    return await prisma.subscription.findMany({
        where: {
            status: "initialised"
        }
    })
}

export async function updateSubscriptionStatus(id: string, status: string) {
    return await prisma.subscription.update({
        where: {
            id: id
        },
        data: {
            status: status
        }
    })
}