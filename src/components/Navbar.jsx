import React from 'react'
import anonLogo from "../assets/anonlogo.png"

const Navbar = () => {
  return (
    <div>
      <div className='flex justify-between bg-blue-700 text-white p-6'>
        <div className='w-32'>
          <img src={anonLogo} alt="logo" />
        </div>
        <div>
          <button>sign out</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar