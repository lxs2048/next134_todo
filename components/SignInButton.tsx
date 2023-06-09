'use client'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { Menu, Transition } from '@headlessui/react'
import classNames from 'classnames'
import { ArrowRightOnRectangleIcon, CheckIcon } from '@heroicons/react/24/solid'
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useEffect, useState } from 'react'
import Avatar from 'react-avatar'
const COPY_ICON_CLASS = 'cursor-pointer h-4 w-4 text-stone-400'
const SignInButton = () => {
  const { data: session } = useSession()
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 1000)
    }
  }, [copied])
  return (
    <>
      <Menu
        as="div"
        className="relative w-[54px] flex items-center justify-center"
      >
        <Menu.Button>
          <Avatar
            className="cursor-pointer"
            name={session?.user?.name || 'T'}
            size="48"
            round
            color="#edcee5"
          />
        </Menu.Button>
        {session && (
          <Transition
            enter="transition duration-150 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-150 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Menu.Items className="bg-white absolute right-0 mt-8 flex origin-top-right flex-col rounded-xl py-4 text-white shadow-lg focus:outline-none">
              <div className="mb-4 flex gap-4 px-6 text-sm">
                <div className="relative h-10 w-10">
                  <Image
                    src={session?.user?.image!}
                    alt={session?.user?.name!}
                    className="inline-block rounded-full"
                    fill
                  />
                </div>
                <div>
                  <p className="font-medium text-stone-600">
                    {session?.user?.name || 'User name'}
                  </p>
                  <div className="text-stone-400 flex gap-1">
                    <div>{session?.user?.email}</div>
                    <CopyToClipboard
                      text={session?.user?.email!}
                      onCopy={() => setCopied(true)}
                    >
                      {copied ? (
                        <CheckIcon className={COPY_ICON_CLASS} />
                      ) : (
                        <DocumentDuplicateIcon className={COPY_ICON_CLASS} />
                      )}
                    </CopyToClipboard>
                  </div>
                </div>
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={classNames({
                        'text-gray-900': true,
                        'bg-violet-500 text-white': active,
                        'flex w-full items-center rounded-md px-2 py-2 text-sm':
                          true,
                      })}
                      onClick={() => signOut()}
                    >
                      <ArrowRightOnRectangleIcon className="mr-2 h-5 w-5 text-stone-400" />
                      <span>退出登录</span>
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        )}
      </Menu>
    </>
  )
}

export default SignInButton
