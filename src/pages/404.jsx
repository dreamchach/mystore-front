import { Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div>
        <p>this page is not exist</p>
        <Link href='/'>
            <Button>홈페이지로</Button>
        </Link>
    </div>
  )
}

export default NotFound