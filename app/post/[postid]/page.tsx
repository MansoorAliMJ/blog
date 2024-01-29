import React, { Fragment } from 'react'
import { post, dataBlog, paramss } from '@/app/component/types/types'
import parse from 'html-react-parser'

import Image from 'next/image'

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
    <Fragment>
      {!data.errorCode && (
        <div>
          <h1>{data.res.blog.title}</h1>
          <Image
            src={data.res.blog.photo_url}
            width={700}
            height={400}
            alt={`Picture of the ${data.res.blog.id}`}
          />
          <div>
            {data.res.blog.content_html
              ? parse(data.res.blog.content_html)
              : data.res.blog.content_text}
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default page
