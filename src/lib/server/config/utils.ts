import { env } from "$env/dynamic/private";

export function isAdmin(email: string) {
    const admins = env.ADMINS.split(',');
    return admins.includes(email);
}