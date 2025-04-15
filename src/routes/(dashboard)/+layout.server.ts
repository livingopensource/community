import { redirect } from '@sveltejs/kit';

export async function load(event) {
    const session = await event.locals.auth();

    if (!session?.user) {
        const redirectTo = `/signin?redirect=${encodeURIComponent(event.url.pathname + event.url.search)}`;
        throw redirect(302, redirectTo);
    }

    // Make sure the logged in user has a name
    if (event.url.pathname !== "/dash/user") {
        if (!session?.user.name) redirect(303, `/dash/user?redirect=${encodeURIComponent(event.url.pathname + event.url.search)}`);
    }

    return {
        user: session.user,
        title: 'Dashboard',
    };
}