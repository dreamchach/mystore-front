import React, { useEffect, useState } from 'react'
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';
import { getCookie } from '@/utill/cookies';
import { Button } from '@mui/material';

const MyButton = () => {
    const [login, setLogin] = useState(false)
    const [admin, setAdmin] = useState(false)
    
    useEffect(() => {
        if(getCookie('accessToken')) {
            setLogin(true)
        }
    }, [getCookie('accessToken')])

    useEffect(() => {
        if(getCookie('masterkey')){
            setAdmin(true)
        }
    }, [getCookie('masterkey')])
    

  return (
    <div className='hover:text-main flex gap-1.5'>
        {admin &&
            <Link href='/admin'>
                <Button variant='outlined' color='error'>
                    관리자페이지로  
                </Button>
            </Link> 
        }
        <button>
            {!login ? 
                <Link href='/auth/login'>
                    <LoginIcon/>
                    <span>로그인</span>
                </Link> : 
                <Link href='/auth/mypage'>
                    <AccountCircleIcon/>
                </Link>
            }
        </button>
    </div>
  )
}

export default MyButton