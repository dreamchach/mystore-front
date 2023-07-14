import withAuth from '@/components/withAuth'
import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const Index = () => {
  return (
    <div className='flex flex-col items-center mt-12 gap-5'>
        <Link href='/auth/mypage/info'>
            <Button variant='outlined' color='error' sx={{width : '300px'}}>내 정보 보기</Button>
        </Link>
        <Link href='/auth/mypage/cart'>
            <Button variant='outlined' color='error' sx={{width : '300px'}}>장바구니</Button>
        </Link>
        <Link href='/auth/mypage/history'>
            <Button variant='outlined' color='error' sx={{width : '300px'}}>구매한 목록</Button>
        </Link>
    </div>
  )
}

export default withAuth(Index) 