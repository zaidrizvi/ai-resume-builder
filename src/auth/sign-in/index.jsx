import { SignIn, SignUp } from '@clerk/clerk-react'
import React from 'react'

const Signinpage = () => {
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-50'>
      <div className='scale-125 p-8 rounded-xl shadow-lg bg-white'>
        <SignIn />
      </div>
    </div>
  )
}

export default Signinpage