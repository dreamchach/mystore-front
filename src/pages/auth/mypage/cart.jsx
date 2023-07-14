import { instance } from '@/apis/instance'
import withAuth from '@/components/withAuth'
import { deleteCartProduct, payCartProduct } from '@/store/thunkFunctions'
import { Button, Checkbox } from '@mui/material'
import { pink } from '@mui/material/colors'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Cart = () => {
  const [deletes, setDeletes] = useState([])
  const [items, setItems] = useState([])
  const [user, setUser] = useState(null)
  const [check, setCheck] = useState('')
  const [sumPrice, setSumPrice] = useState(0)
  const userData = useSelector(state => state.user.userData)
  const router = useRouter()
  const dispatch = useDispatch()
  const noImage = `https://www.gtn-co.com/cms/wp-content/uploads/2020/06/noimage.jpg`
  const onCheck = (event, item) => {
    setCheck(`${event.target.checked} ${item}`)
  }

  useEffect(() => {
    if(check.split(' ')[0] === 'true') {
      setDeletes([...deletes, check.split(' ')[1]])
    }else {
      let array = deletes.filter((i) => i !== check.split(' ')[1])
      console.log(check.split(' ')[1])
      console.log('array', array)
      setDeletes(array)
    }
  }, [check])

  const onDelete = () => {
    if(deletes.length > 0) {
      deletes.map(async(item) => {
        try {
          const body = {detailId : item}
          await dispatch(deleteCartProduct(body))
        } catch (error) {
          console.log(error)
        }
      })
      const newItem = items.filter((i) =>{ 
        return !deletes.includes(i.detailId)
    })
    setItems(newItem)
    const price = newItem.reduce((a, b) => a + (b.num * b.price), 0)
    console.log(price)
    setSumPrice(price)
    }
  }
  const onPay = () => {
    if(items.length > 0) {
      items.map(async (item) => {
        try {
          const data = {
            detailId : item.detailId,
            productId : item.productId
          }
          await dispatch(payCartProduct(data))
        } catch (error) {
          console.log(error)
        }
      })
      router.push({
        pathname : '/auth/mypage/success',
        query : {
          sumPrice
        }
      })
    }
  }

  useEffect(() => {
    setUser(userData)
  }, [])

  const detailItem = async(id) => {
    const response = await instance.get(`/api/products/${id}`)
    return response.data.product
  }

useEffect(() => {
if(user !== null){
      let array = []
      let detailId = []
      let price = 0
Promise.all(
  user.cart.map(async (item, index) => {
    let a = await detailItem(item.id)
    let b = {...a}
    price += (b.price * item.qua)
    const cart = {
      num : item.qua,
      detailId : item.detailId,
      title : b.title,
      thumbnail : b.thumbnail,
      price : b.price,
      productId : b.productId
    }
    await array.push(cart)
    await detailId.push(item.detailId)
    if(index === user.cart.length - 1) {
      setItems([...array])
      setDeletes([...detailId])
      setSumPrice(price)
    }
  })
)
    }
}, [user])
  
  return (
    <div className='w-5/6 m-auto pt-12'>
      <div className='border-y border-main_black'>
        {items.length > 0 && items.map((item) => (
          <div key={item.productId} className='w-full text-center flex justify-evenly mt-5 border-b border-slate-300 items-center'>
            <Checkbox defaultChecked sx={{color : pink[800], '&.Mui-checked' : {color : pink[600]}}} onClick={() => onCheck(event, item.detailId)}/>
            <div className='w-2/5 m-5'>
              <img className='w-2/5' src={item.thumbnail[0] === '' ? noImage : `${process.env.NEXT_PUBLIC_API_BASE_URL}/image/${item.thumbnail[0]}`} alt={item.title}/>
            </div>
            <div className='w-1/5'>
              {item.title}
            </div>
            <div className='w-1/5'>
              {`${Number(item.price).toLocaleString()}원`}
            </div>
            <div className='w-1/5'>
              {`${item.num}개`}
            </div>
          </div>
        ))}
        <div className='p-5 text-right'>
          <span>총 합계</span> <span className='font-bold'>{`${Number(sumPrice).toLocaleString()}원`}</span>
        </div>
      </div>
      <div className='flex justify-end gap-5 mt-12'>
        <Button variant='outlined' color='error' onClick={onDelete}>선택한 상품 삭제하기</Button>
        <Button variant='outlined' color='error' onClick={onPay}>결제하기</Button>
      </div>
    </div>
  )
}

export default withAuth(Cart)