import React from 'react'
import home from "../assets/home.png"
import message from "../assets/message.png"
import avatar from "../assets/avatar.png"
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <div style={{
        backgroundImage: "linear-gradient(104deg, #DFD6F6, #BECBF7)",
        position: "fixed",
        bottom: 0,
        right: 0,
        left: 0 // Make sure the navbar spans the full width
      }} className='flex justify-between text-white p-6 w-full h-20 rounded-t-3xl z-10'>
        <div className='flex justify-between items-center w-full max-w-screen-lg mx-auto px-8'>
          <Link to='/home' className='max-w-[30px] block'>
            <img src={home} alt="icons" className='w-full h-full' />
          </Link>
          <Link to='/messages' className='max-w-[30px] block'>
            <img src={message} alt="icons" className='w-full h-full' />
          </Link>
          <Link to='/profile' className='max-w-[30px] block'>
            <img src={avatar} alt="icons" className='w-full h-full' />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
