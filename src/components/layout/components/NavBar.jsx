import React from 'react'
import Logo from './Logo'
import MyButton from './MyButton'
import Tags from './Tags'

const NavBar = () => {
  return (
    <div>
        <div className='bg-main flex justify-center p-2.5'>
            <Logo/>    
        </div>
        <div className='flex justify-end py-2.5 pr-5'>
            <MyButton/>
        </div>
        <div>
            <Tags/>
        </div>
    </div>
  )
}

export default NavBar