import Login from '@/pages/auth/login'
import React from 'react'
import { useCookies } from 'react-cookie'

const withAuth = (Component) => {
    const Auth = () => {
        const [cookies, setCookies] = useCookies()
        if(!cookies.accessToken) {
            return <Login/>
        }
        return <Component />
    }
  return Auth
}

export default withAuth