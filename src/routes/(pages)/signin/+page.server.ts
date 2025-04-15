import { redirect } from "@sveltejs/kit";
import { signIn } from "../../../auth"
import type { Actions } from "./$types"
 
export const actions: Actions = { default: signIn }

export async function load(event) {
    const session = await event.locals.auth();
    if (session?.user) {
      const redirectTo = event.url.searchParams.get('redirect') || '/dash';
      // Redirect the user back to the original page or the homepage
      throw redirect(302, decodeURIComponent(redirectTo));
    }
}