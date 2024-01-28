import type { Metadata } from 'next'
import React, { Suspense } from 'react'

import styles from './page.module.css'
import Blogs from '@/app/component/Blogs'

export const metadata: Metadata = {
  title: 'Usedo | Blog, listing, and More',
  description:
    'Usedo is a cutting-edge digital platform.To Unlock knowledge with expert blog posts, Your destination for learning and inspiration.',
  keywords: ['usedo blog', 'usedo', 'usedo listing'],
  robots: {
    index: true,
    nocache: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Blogs Lists</h1>
        <Suspense fallback={<span className='loader-spiner'></span>}>
          <Blogs />
        </Suspense>
      </div>
    </main>
  )
}
