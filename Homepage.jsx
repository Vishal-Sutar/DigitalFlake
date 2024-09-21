import React from 'react'
import Logo from '../assets/logo.png'

const Homepage = () => {
    return (
        <div className='flex h-[70vh] justify-center items-center bg-gray-100'>
            <div className='flex flex-col items-center justify-center'>
                <img src={Logo} className='w-40 mb-4' alt="logo" />
                <p className='text-lg text-gray-600 font-medium '>Welcome to Digitalflake Admin</p>
            </div>
        </div>
    )
}

export default Homepage
