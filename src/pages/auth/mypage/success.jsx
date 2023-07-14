import withAuth from '@/components/withAuth'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

const Success = () => {
    const router = useRouter()
    const goHome = () => {
        router.push('/')
    }
    const goCart = () => {
        router.push('/auth/mypage/cart')
    }
  return (
    <div className='flex flex-col items-center pt-12'>
        <div>
            <div>구매를 요청했습니다</div>
            <div><span>계좌번호</span>로 <span className='font-bold text-main'>{Number(router.query.sumPrice).toLocaleString()}원</span>을 입금해주세요</div>
            <div>입금 확인 후 택배를 보내드립니다</div>
        </div>

        <div className='flex mt-12 gap-5'>
            <div>
                <Button variant='outlined' color='error' onClick={goHome} sx={{width : '100px'}}>처음으로</Button>
            </div>
            <div>
                <Button variant='outlined' color='error' onClick={goCart} sx={{width : '100px'}}>장바구니로</Button>
            </div>
            
        </div>
    </div>
  )
}

export default withAuth(Success) 