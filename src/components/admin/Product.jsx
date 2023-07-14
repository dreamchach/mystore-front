import React, { useEffect, useState } from 'react'
import { instance } from '@/apis/instance'
import ProductPhoto from './ProductPhoto'
import ProductInfo from './ProductInfo'
import ProductDesc from './ProductDesc'
import { Button } from '@mui/material'

const Product = () => {
  const [id, setId] = useState(location.pathname.substring(7))
  const [items, setItems] = useState(null)
  const [change, setChange] = useState(false)
  const [data, setData] = useState(null)
  const onPatch = async () => {
    if(!change) {
      setChange(true)
    }else {
      console.log(id)
      console.log(data)
      if(data === null) {
        setChange(false)
      } else {
        try {
          const response = await instance.put(`/api/products/${id}`, data)
          console.log(response.data)
          setChange(false)
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

useEffect(async()=> {
  const response = await instance.get(`/api/products/${id}`)
  const item = response.data.product
  setItems(item)
},[])

console.log('items', items)

  return (
    <div>
      {items !== null && (
        <div>
          <div>
            <div className='flex gap-5 m-12'>
              <ProductPhoto 
                image={items.photo}
                change={change}
                data={data}
                setData={setData}
              />
              <ProductInfo 
                title={items.title} 
                price={items.price} 
                sold={items.sold} 
                isSoldOut={items.isSoldOut}
                tag={items.tag}
                change={change}
                data={data}
                setData={setData}
              />
            </div>
            <div>
              <ProductDesc 
                desc={items.desc} 
                description={items.description}
                change={change}
                data={data}
                setData={setData}
              />
            </div>
          </div>
          <div className='flex justify-center m-12'>
             <Button variant='outlined' color='error' sx={{width : '100%'}} onClick={onPatch}>{change ? '수정 완료' : '상품 수정'}</Button>
          </div>
          
        </div>
      )}
    </div>
  )
}

export default Product