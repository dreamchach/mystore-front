import { getCookie } from '@/utill/cookies'
import { Button } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Admin = () => {
    const router = useRouter()

    useEffect(() => {
        if(!getCookie('masterkey')){
            router.push({pathname : '/'})
        }
    }, [getCookie('masterkey')])
    
  return (
    <div className='flex justify-center gap-5 mt-10 flex-col items-center'>
      <Link href='/admin/viewproducts'>
        <Button variant='outlined' color='error' sx={{width : '35ch'}}>
          전체 상품 보기
        </Button>
      </Link>
      <Link href='/admin/transactions'>
        <Button variant='outlined' color='error' sx={{width : '35ch'}}>
          전체 거래 보기
        </Button>
      </Link>
    </div>
  )
}

export default Admin