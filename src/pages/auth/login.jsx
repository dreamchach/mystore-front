import Link from 'next/link'
import React from 'react'

const login = () => {
  return (
    <div>
        <p>
            <Link href='/auth/signup'>
                <div>회원가입</div>
            </Link>
        </p>
    </div>
  )
}

export default login