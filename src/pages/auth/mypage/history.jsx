import { instance } from '@/apis/instance'
import withAuth from '@/components/withAuth'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const History = () => {
  const [historys, setHistorys] = useState([])
  const userData = useSelector(state => state.user.userData)
  const noImage = `https://www.gtn-co.com/cms/wp-content/uploads/2020/06/noimage.jpg`
  const api = async () => {
    const data = {
      email : userData.email
    }
    const response = await instance.post('/api/products/transactions/details', data)
    return response.data
  }

  useEffect(async () => {
    if(userData) {
      const data = await api()
      setHistorys(data)
    }
  }, [userData])
  console.log('historys', historys, historys.length > 0)
  
  
  return (
    <div className='my-12 mx-auto w-4/5 border-y border-main_black'>
      {historys.length > 0 && historys.map((item) => (
        <div key={item.item.detailId} className='flex items-center w-full border-b border-slate-300'>
          <div className='w-1/5'>
            <img src={item.data.thumbnail[0] === '' ? noImage : `${process.env.NEXT_PUBLIC_API_BASE_URL}/image/${item.data.thumbnail[0]}`} alt={item.data.title}/>
          </div>
          <div className='w-1/5 text-center'>{item.data.title}</div>
          <div className='w-1/5 text-center'>{Number(item.data.price * item.item.qua).toLocaleString()}원</div>
          <div className='w-1/5 text-center'>{item.item.qua}개</div>
          <div className='w-1/5 text-center'>{new Date(item.item.date).toLocaleString()}</div>
        </div>
      ))}

    </div>
  )
}

export default withAuth(History) 
