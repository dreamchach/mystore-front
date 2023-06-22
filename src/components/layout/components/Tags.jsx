import React from 'react'
import { tags } from '../../../utill/array'
import Link from 'next/link'

const Tags = () => {
  return (
    <div className='flex border-solid border-y-2 border-main_black py-5 justify-center'>
        {tags.map((item) => (
            <Link href={`/products/list/${item.eng}`} key={item.eng}>
                <div className='px-2.5 hover:text-main font-bold'>{item.ko}</div>
            </Link>
        ))}
    </div>
  )
}

export default Tags