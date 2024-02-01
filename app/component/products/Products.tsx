'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import ReactPaginate from 'react-paginate'
import {
  useGetProductsQuery,
  useGetCategoriesQuery,
} from '@/app/redux/apis/productApi'

import { product, category } from '@/app/component/types/types'
import style from '@/app/page.module.css'

const Products = () => {
  const router = useRouter()
  const [page, setPage] = useState(0)
  const [query, setQuery] = useState<string>('')
  const [queryValue, setQueryValue] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const { data, isLoading, isSuccess, isFetching } = useGetProductsQuery({
    page,
    search: query,
    category: category,
  })
  const {
    data: catgeoryData,
    isLoading: categoryLoading,
    isSuccess: categorySuccess,
    isFetching: categoryFetching,
  } = useGetCategoriesQuery()

  const HandleSearchFilter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const { target } = e
      setQuery((target as HTMLButtonElement).value)
      setPage(0)
    }
  }

  const clearFilterV = (e: React.ChangeEvent<HTMLInputElement>) => {
    if ((e.target as HTMLButtonElement).value === '') {
      setQuery('')
      setQueryValue('')
      setPage(0)
    } else {
      setQueryValue((e.target as HTMLButtonElement).value)
    }
  }

  const handlePageClick = () => {
    setPage(page + 1)
  }
  return (
    <div className='display-flex'>
      <div className={style.categoriesBox}>
        <div className={style.filter}>
          <div className='font-wt-600 '>Filters</div>
          {(query || category) && (
            <div
              className={style.clearFilter}
              onClick={() => {
                setCategory('')
                setQuery('')
                setQueryValue('')
              }}
            >
              Clear filters
            </div>
          )}
        </div>
        <div className={style.categories}>
          <div className='mb-1'>
            <input
              type='text'
              placeholder='Search Query'
              className={style.searchQuery}
              onKeyUp={HandleSearchFilter}
              onChange={clearFilterV}
              value={queryValue}
            />
          </div>
          <div className={style.categoryWrapper}>By Category</div>
          {(categoryLoading || categoryFetching) && (
            <div className='display-flex-item-center'>
              <span className='loader-spiner'></span>
            </div>
          )}
          {isSuccess &&
            catgeoryData?.map((category: category) => {
              return (
                <div
                  key={category}
                  className={style.category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </div>
              )
            })}
        </div>
      </div>

      <div className={style.mainWrapper}>
        <div className={style.postWrapper}>
          {(isLoading || isFetching) && (
            <div className='display-flex-item-center'>
              <span className='loader-spiner'></span>
            </div>
          )}

          {isSuccess &&
            data.products.map((product: product) => {
              return (
                <div
                  key={product.id}
                  className={style.post}
                  onClick={() => {
                    router.push(`/product/${product.id}`)
                  }}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className={style.productImage}
                  />
                  <div className={style.productInfo}>
                    <div
                      className={style.productprice}
                    >{`${product.price} KWD`}</div>
                    <div>
                      <div className={style.productTitle}>{product.title}</div>
                      <div className={style.productBrand}>{product.brand}</div>
                    </div>
                    <div className={style.postDescription}>
                      {product.description}
                    </div>
                  </div>
                </div>
              )
            })}
          {isSuccess && !data.total && <div>No data found for your search</div>}
        </div>
        {isSuccess && (
          <ReactPaginate
            nextLabel='next'
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={data?.total ? data.total : 0}
            previousLabel='previous'
            pageClassName='page-item'
            pageLinkClassName='page-link'
            previousClassName='page-item'
            previousLinkClassName='page-link'
            nextClassName='page-item'
            nextLinkClassName='page-link'
            breakLabel='...'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            containerClassName='pagination'
            activeClassName='active'
            renderOnZeroPageCount={null}
          />
        )}
      </div>
    </div>
  )
}

export default Products
