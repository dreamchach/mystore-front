import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const Admin = () => {
    
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