import { redirect } from '@sveltejs/kit';

export async function load(event) {
    const session = await event.locals.auth();

    if (!session?.user) {
        redirect(303, `/signin`);
    }

    // Make sure the logged in user has a name
    if (event.url.pathname !== "/dash/user") {
        if (!session?.user.name) redirect(303, `/dash/user`);
    }

    return {
        user: session.user,
        title: 'Dashboard',
    };
}