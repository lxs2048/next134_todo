import { getUserByEmail, updateUser } from '@/lib/user'
import NextAuth, { Account, Profile, User } from 'next-auth'
import { AdapterUser } from 'next-auth/adapters'
import GithubProvider from 'next-auth/providers/github'
type callbacksParams = {
  user: AdapterUser | User
  account: Account | null
  profile?: Profile | undefined
  email?: { verificationRequest?: boolean | undefined } | undefined
}
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
  callbacks: {
    async signIn(params: callbacksParams) {
      try {
        const { user } = params
        const { name, email, image } = user
        if (!email) return false
        const db_user = await getUserByEmail(email)
        if (!db_user) {
          await updateUser({ name, email, image })
        }
      } catch (error) {
        throw new Error('Error saving user to database')
      }
      return true
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
