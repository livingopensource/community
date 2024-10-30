import { Session } from '$lib/server/databases/pg/users';

export async function load(event) {
    let user;
    const losfCookie = event.cookies.get("losf");
    if (losfCookie != null) {
       user = await Session.getUser(losfCookie);
    }
    return {
        user: user?.toJSON(),
        title: 'Dashboard',
    };
}