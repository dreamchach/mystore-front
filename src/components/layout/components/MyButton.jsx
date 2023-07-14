import React, { useEffect, useState } from 'react'
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';
import { getCookie } from '@/utill/cookies';
import { Avatar, Button } from '@mui/material';
import { useSelector } from 'react-redux';

const MyButton = () => {
    const [login, setLogin] = useState(false)
    const [admin, setAdmin] = useState(false)
    const profileImage = useSelector(state => state.user.userData.profileImgBase64)
    
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
    <div className='flex gap-1.5'>
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
                    {profileImage === '' ? <AccountCircleIcon/> : <Avatar alt='profileImage' src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/image/${profileImage}`}/>}               
                </Link>
            }
        </button>
    </div>
  )
}

export default MyButton