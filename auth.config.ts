import type { AuthConfig } from '@auth/core'
import GitHub from '@auth/core/providers/github'

export const authConfig: AuthConfig = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET!,
  trustHost: true,
  callbacks: {
    session: async ({ session, token }) => {
      // Ensure session.user.id exists
      if (token?.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },
}
