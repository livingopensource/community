import { SvelteKitAuth } from "@auth/sveltekit"
import Google from "@auth/sveltekit/providers/google"
import type { Provider } from "@auth/sveltekit/providers"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "$lib/server/databases/prisma"
import Nodemailer from "@auth/sveltekit/providers/nodemailer"
import { env } from "$env/dynamic/private"

const providers: Provider[] = [
  Nodemailer({
    server: {
      host: env.EMAIL_SERVER_HOST,
      port: parseInt(env.EMAIL_SERVER_PORT),
      secure: Boolean(env.EMAIL_SSL),
      auth: {
        user: env.EMAIL_SERVER_USER,
        pass: env.EMAIL_SERVER_PASSWORD,
      },
      tls: {
        rejectUnauthorized: Boolean(env.EMAIL_SSL_VERIFY)
    }
    },
    from: env.EMAIL_FROM,
  }), 
  Google
]

export const providerMap = providers.map((provider) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  return { id: provider.id, name: provider.name }
})

export const { handle, signIn, signOut } = SvelteKitAuth({
  adapter: PrismaAdapter(prisma),
  providers,
  pages: {
    signIn: "/signin",
    signOut: "/signout",
    verifyRequest: "/verify-request",
    error: "/error",
    newUser: "/dash/user"
  },
  trustHost: true
})