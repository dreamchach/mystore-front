import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const index = () => {
  return (
    <div>
        <Link href='/auth/mypage/info'>
            <Button>내 정보 보기</Button>
        </Link>
        <Link href='/auth/mypage/cart'>
            <Button>장바구니</Button>
        </Link>
        <Link href='/auth/mypage/history'>
            <Button>구매한 목록</Button>
        </Link>
    </div>
  )
}

export default index