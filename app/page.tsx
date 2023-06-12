import Board from '@/components/Board'
import FixedAdd from '@/components/FixedAdd'
import Header from '@/components/Header'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from './api/auth/[...nextauth]/route'
import { Session } from 'next-auth/core/types'
export default async function Home() {
  const session = (await getServerSession(authOptions)) as Session | null

  if (!session) {
    redirect('/signin?callbackUrl=/')
  }
  return (
    <main>
      <Header session={session} />
      <Board />
      <FixedAdd />
    </main>
  )
}
