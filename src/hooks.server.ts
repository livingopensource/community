//import { extendExpiry } from '$lib/server/database/redis';
import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';

export const handle = async({ event, resolve }) => {
    const sessionId = event.cookies.get('losf');
    if (!sessionId) {
        if (event.url.pathname.startsWith("/dash")) {
            console.debug('Tried to access unauthorised route');
            const redirectUrl = event.url.pathname;
            throw redirect(302, `/login?redirect=${redirectUrl}`);
        }
    } else {
        event.cookies.set("losf", sessionId, {
            path: "/",
            sameSite: 'strict',
            httpOnly: true,
            secure: env.ENV == 'production',
            maxAge: Number(env.SessionTTL)
        })
       // extendExpiry(sessionId, ttl)
    }
    return resolve(event);
}