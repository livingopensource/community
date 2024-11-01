import { Session } from "$lib/server/databases/pg/users.js";
import { redirect } from "@sveltejs/kit";

export const actions = {
    logout: async ({ cookies }) => {
        const sessionId = cookies.get("losf");
        if (sessionId) {
            Session.deleteSession(sessionId)
            cookies.delete("losf", {
                path: "/"
            });
        }
        throw redirect(302, "/");
    }
}