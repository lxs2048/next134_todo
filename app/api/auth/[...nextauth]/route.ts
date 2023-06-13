import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  session: {
    jwt: true,
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
