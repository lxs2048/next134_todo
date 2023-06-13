'use client'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import dayjs from 'dayjs'
import { useMemo } from 'react'
const ClientProtectPage = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin?callbackUrl=/protected/client')
    },
  })
  const expirationDate = useMemo(() => {
    if (session?.expires) {
      const timeString = session.expires
      return dayjs(timeString).locale('zh-cn').format('YYYY-MM-DD HH:mm:ss')
    }
    return ''
  }, [session?.expires])

  return (
    <section className="py-24">
      <div className="container">
        <h1 className="text-2xl font-bold">
          This is a <span className="text-emerald-500">client-side</span>{' '}
          protected page
        </h1>
        <h2 className="mt-4 font-medium">You are logged in as:</h2>
        <p className="mt-4">{session?.user?.name}</p>
        <p>从当前时间{expirationDate}后【maxAge】过期</p>
      </div>
    </section>
  )
}

export default ClientProtectPage
