'use client'
import React, { useState, useEffect } from 'react'
import { useGetBlogPostsQuery } from '@/app/redux/apis/blogApi'
import { useRouter } from 'next/navigation'

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
        window.innerHeight + window.scrollY >= document.body.offsetHeight
      if (scrolledToBottom && !isFetching) {
        setStart(start + 20)
        setEnd(end + 20)
      }
    }

    document.addEventListener('scroll', onScroll)

    return function () {
      document.removeEventListener('scroll', onScroll)
    }
  }, [start, end, isFetching])
  console.log(data)
  return (
    <div>
      {isSuccess &&
        data.blogs.map((blog: typeof data.blogs, index: number) => {
          return (
            <div
              key={blog.id}
              onClick={() => {
                router.push(`/post/${blog.id}`)
              }}
            >
              <img
                src={blog.photo_url}
                alt={blog.title + index}
                style={{ width: '300px' }}
              />
              <div>{blog.title}</div>
            </div>
          )
        })}
    </div>
  )
}

export default Blogs
