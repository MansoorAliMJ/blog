'use client'
import React, { useEffect } from 'react'
import style from './navbar.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname()
  return (
    <div className={style.navbarWrapper}>
      <Link href={'/'} className='display-flex'>
        <Image
          src={'/images/usedo.png'}
          width={40}
          height={40}
          alt={'logo'}
        ></Image>
      </Link>

      <Link
        href={'/'}
        className={`${pathname === '/' && style.nabarselected} ${style.nabar}`}
      >
        Home
      </Link>

      <Link
        href={'/blog'}
        className={`${pathname === '/blog' && style.nabarselected} ${
          style.nabar
        }`}
      >
        Blog
      </Link>
      <Link
        href={'https://www.linkedin.com/in/mansooralij/'}
        className={`${style.nabar}`}
      >
        Aboutme
      </Link>
    </div>
  )
}

export default Navbar
