import { getCookie } from '@/utill/cookies'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Transactions = () => {
    const router = useRouter()

    useEffect(() => {
        if(!getCookie('masterkey')){
            router.push({pathname : '/'})
        }
    }, [getCookie('masterkey')])

  return (
    <div>transactions</div>
  )
}

export default Transactions