import { Button } from '@mui/material'
import React, { useState } from 'react'
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';

const MyButton = () => {
    const [login, setLogin] = useState(false)
    const logToggle = () => {
        setLogin(!login)
    }

  return (
    <div className='hover:text-main'>
        <button onClick={logToggle}>
            {!login ? 
                <Link href='/auth/login'>
                    <LoginIcon/>
                    <span>로그인</span>
                </Link> : 
                <div>
                    <LogoutIcon/>
                    <span>로그아웃</span>
                </div>}
        </button>
    </div>
  )
}

export default MyButton