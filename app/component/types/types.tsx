export type post = {
  success?: boolean
  message?: string
  blog: blog
}

export type blog = {
  content_text?: string
  title: string
  photo_url: string
  created_at: Date
  id: number
  description?: string
  content_html?: string
  category?: string
  updated_at: string
}
export type dataBlog = {
  errorCode: Boolean | number
  res: post
}

export type paramss = {
  params: {
    postid: number
  }
}

export type posts = {
  total_blogs?: number
  offset?: number
  limit?: number
  success?: boolean
  message?: string
  blogs: blog[]
}

export type product = {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: []
}

export type products = {
  products: product[]
  total: number
  skip: number
  limit: number
}

export type categories = [string]

export type category = string
