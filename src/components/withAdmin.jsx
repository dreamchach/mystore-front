import Home from '@/pages'
import Login from '@/pages/auth/login'
import React from 'react'
import { useCookies } from 'react-cookie'

const withAdmin = (Component) => {
    const Admin = () => {
        const [cookies, setCookies] = useCookies()
        if(!cookies.accessToken) {
            return <Login />
        }else if(!cookies.masterkey) {
            return <Home />
        }
        return <Component />
    }
  return Admin
}

export default withAdmin