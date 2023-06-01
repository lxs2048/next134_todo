import Image from 'next/image'
import { UserCircleIcon } from '@heroicons/react/24/solid'

function Header() {
  return (
    <header>
      <Image
        src={'https://heroicons.com/_next/static/media/beams.1fcfd97b.jpg'}
        alt={'heroicons bg'}
        width={300}
        height={100}
        className="w-44 md:w-56 pb-10 md:pd-0 object-contain"
      ></Image>
      {/* 符合标准JavaScript语法和React的最佳实践，即要求在JSX中使用双引号而不是单引号来定义属性 */}
      <UserCircleIcon className="h-6 w-6 text-gray-400" />
    </header>
  )
}

export default Header
