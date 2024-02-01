import React from 'react'
import { post, dataBlog, paramss } from '@/app/component/types/types'
import parse from 'html-react-parser'
import Image from 'next/image'
import { BsArrowLeftSquare } from 'react-icons/bs'
import Link from 'next/link'

import ReletedPosts from '@/app/component/Blogs/ReletedPosts'
import style from './post.module.css'

export async function generateMetadata({ params }: paramss) {
  const postid = params.postid
  const data: dataBlog = await fetchData(postid)

  if (!data.errorCode) {
    return {
      title: `${data.res.blog?.title}`,
      description: `${data.res.blog.description} `,
      keywords: [
        `${data.res.blog.category}`,
        `${data.res.blog.title}`,
        'usedo blog',
      ],
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
  }
}

const fetchData = async (postid: number) => {
  const response = await fetch(
    `${process.env.APP_BACKEND_URL}/sample-data/blog-posts/${postid}`
  )

  const res: post = await response.json()

  const errorCode = response.ok ? false : response.status

  return { errorCode, res }
}

const page = async ({ params }: paramss) => {
  const postid = params.postid
  const data = await fetchData(postid)
  return (
    <main className={style.postMain}>
      <div className={style.postWrapper}>
        <Link href={'/blog'}>
          <BsArrowLeftSquare size={20} className='cursor-pointer color-white' />
        </Link>
        {!data.errorCode && (
          <>
            <div className={style.postHeader}>
              <h6 className='mb-2'>{`bolg>${data.res.blog.category}`}</h6>
              <h1>{data.res.blog.title}</h1>
              <div className={`${style.postDate} mt-2`}>
                {new Date(data.res.blog.created_at).toLocaleDateString(
                  'en-US',
                  {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  }
                )}
              </div>
            </div>
            <div className={style.postblog}>
              <div className={style.imageWrapper}>
                <Image
                  src={data.res.blog.photo_url}
                  width={700}
                  height={393.75}
                  // sizes='(max-width: 700px) 100vw, 33vw'
                  // quality={80}
                  alt={`Picture of the ${data.res.blog.id}`}
                />
              </div>
              <div className={style.postContent}>
                {data.res.blog.content_html
                  ? parse(data.res.blog.content_html)
                  : data.res.blog.content_text}
              </div>
            </div>
            <hr />
            <div className={style.pofileWrapper}>
              <Image
                src='/images/default.jpeg'
                alt='profile'
                height={150}
                width={150}
                className={style.profileImage}
              />
              <div>
                <h4 className='mb-1'>Sample User</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut
                  feugiat metus. Integer ut aliquam magna, at mattis mauris.
                  Nullam bibendum, nunc vel tempor egestas, dolor eros
                  vestibulum turpis, at mattis metus nulla ac ligula. Fusce
                  posuere dolor et tempor lacinia. Nunc velit nisi, ornare sit
                  amet luctus vitae, iaculis eget purus.
                </p>
              </div>
            </div>
            <hr />
            <div>
              <div className={style.reletedPostText}>More Posts by Author</div>
              <ReletedPosts />
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export default page
