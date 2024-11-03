import { Session } from '$lib/server/databases/pg/users';
import { redirect } from '@sveltejs/kit';
//import { ProcessPayments } from '../../lib/server/workers/jobs';

export async function load(event) {
    let user;
    const losfCookie = event.cookies.get("losf");
    if (losfCookie != null) {
       user = await Session.getUser(losfCookie);
    }
    if (user == null) {
        throw redirect(302, "/login");
    }
    // ProcessPayments();
    return {
        user: user.toJSON(),
        title: 'Dashboard',
    };
}