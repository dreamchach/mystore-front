import React from 'react'
import { tags } from '../../../utill/array'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Tags = () => {
  const router = useRouter()

  return (
    <div className='flex border-solid border-y-2 border-main_black py-5 justify-center'>
        {tags.map((item) => (
            <Link href={`/products/list/${item.eng}`} key={item.eng}>
                <div className={`px-2.5 hover:text-main font-bold ${router.asPath.substring(15) === item.eng ? 'text-main' : 'text-main_black'}`}>{item.ko}</div>
            </Link>
        ))}
    </div>
  )
}

export default Tags