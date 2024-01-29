'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useGetBlogPostsQuery } from '@/app/redux/apis/blogApi'
import { blog } from '@/app/component/types/types'
import style from './blog.module.css'

const Blogs = () => {
  const router = useRouter()
  const [start, setStart] = useState<number>(0)
  const [end, setEnd] = useState<number>(20)
  const { data, isLoading, isFetching, isSuccess } = useGetBlogPostsQuery({
    start,
    end,
  })

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY + 1 >= document.body.offsetHeight
      if (scrolledToBottom) {
        setStart(start + 20)
        setEnd(end + 20)
      }
    }

    document.addEventListener('scroll', onScroll)

    return function () {
      document.removeEventListener('scroll', onScroll)
    }
  }, [start, end])

  return (
    <div className={style.blogWrapper}>
      {isSuccess &&
        data.blogs.map((blog: blog, index: number) => {
          return (
            <div
              key={blog.id ? +blog.id + index : index}
              onClick={() => {
                router.push(`/post/${blog.id}`)
              }}
              className={style.blogPost}
            >
              <img
                src={blog.photo_url}
                alt={blog.title + index}
                style={{ width: '90%', height: '18rem', padding: '10px' }}
              />
              <div>{blog.title}</div>
            </div>
          )
        })}

      {(isLoading || isFetching) && (
        <div className='display-flex-item-center'>
          <span className='loader-spiner'></span>
        </div>
      )}
    </div>
  )
}

export default Blogs
