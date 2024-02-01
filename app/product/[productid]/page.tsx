import React from 'react'
import { dataProduct, product, paramproduct } from '@/app/component/types/types'
import { BsArrowLeftSquare } from 'react-icons/bs'
import Link from 'next/link'
import Image from 'next/image'
import style from './product.module.css'
export async function generateMetadata({ params }: paramproduct) {
  const productid = params.productid
  const data: dataProduct = await fetchData(productid)

  if (!data.errorCode) {
    return {
      title: `${data.res?.title}`,
      description: `${data.res.description} `,
      keywords: [
        `${data.res.category}`,
        `usedo ${data.res.title}`,
        'usedo products',
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

const fetchData = async (productid: number) => {
  const response = await fetch(`https://dummyjson.com/products/${productid}`)

  const errorCode = response.ok ? false : response.status

  const res: product = await response.json()

  return { errorCode, res }
}

const page = async ({ params }: paramproduct) => {
  const productid = params.productid
  const data = await fetchData(productid)
  return (
    <main className={style.main}>
      <Link href={'/'}>
        <BsArrowLeftSquare size={20} className='cursor-pointer' />
      </Link>
      {!data.errorCode && (
        <>
          <div className='mb-2'>
            <h6>{`product>${data.res.category}`}</h6>
          </div>
          <div className={style.wrapper}>
            <div className={style.imageWrapper}>
              <img
                src={data.res.thumbnail}
                alt={`Picture of the ${data.res.title}`}
                style={{ width: '100%' }}
              />
            </div>
            <div className={style.userRequest}>
              <div className={style.profileWrapper}>
                <Image
                  src='/images/default.jpeg'
                  alt='profile'
                  height={70}
                  width={70}
                  className={style.profileImage}
                />
                <h4>Mansoor</h4>
                <div style={{ color: 'red' }}>Lister</div>
              </div>
              <h4 className='mb-1'>Your safety matters to us!</h4>
              <ul>
                <li className='mb-1 ml-2'>
                  Only meet in public / crowded places.
                </li>
                <li className='mb-1 ml-2'>
                  Never go alone to meet a buyer / seller, always take someone
                  with
                </li>
                <li className='mb-1 ml-2'>
                  you. Check and inspect the product properly before purchasing
                  it. Never pay anything in advance or transfer money before
                  inspecting the product.
                </li>
              </ul>
            </div>
          </div>
          <h2
            className={`${style.productPrice} mt-1`}
          >{`${data.res.price} KWD`}</h2>
          <h1 className='mt-1'>{data.res.title}</h1>
          <div className={style.postContent}>{data.res.description}</div>
          <div className='mt-2'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            egestas sed ex ac laoreet. Donec placerat eros et ultrices
            vestibulum. Cras accumsan nisl libero, nec scelerisque ipsum feugiat
            ullamcorper. Fusce sollicitudin, quam sed porttitor egestas, sapien
            massa tincidunt est, sit amet ullamcorper augue quam id dui.
            Suspendisse interdum tortor eu lorem convallis, sed accumsan mauris
            scelerisque. Phasellus hendrerit quis quam sed interdum. Curabitur
            gravida consectetur magna, eu ullamcorper ligula placerat id.{' '}
          </div>
        </>
      )}
    </main>
  )
}

export default page
