import { posts, blog } from '@/app/component/types/types'

export async function generateSitemaps() {
  const baseurl = 'http://localhost:3000'
  // Fetch the total number of products and calculate the number of sitemaps needed

  const res = await fetch(
    `https://api.slingacademy.com/v1/sample-data/blog-posts?offset=0&limit=10`
  )

  const post: posts = await res.json()

  const postUrls = post?.blogs?.map((blog: blog, index: number) => {
    return {
      id: index + 1,
      url: `${baseurl}/post/${blog.id}`,
      lastModified: blog.updated_at,
      changeFrequency: 'yearly',
      priority: 1,
    }
  })

  return [
    {
      id: 0,
      url: baseurl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...postUrls,
  ]
}
