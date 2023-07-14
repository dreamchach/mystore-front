import Home from '@/pages'
import React from 'react'
import { useCookies } from 'react-cookie'

const withNoneAuth = (Component) => {
    const Auth = () => {
        const [cookies, setCookies] = useCookies()
        if(cookies.accessToken) {
            return <Home/>
        }
        return <Component />
    }
  return Auth
}

export default withNoneAuth