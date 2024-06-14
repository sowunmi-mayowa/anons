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
        right: 0
      }} className='flex justify-between text-white p-6 w-full h-20 rounded-t-3xl z-10'>
        <div className='flex justify-between items-center w-full px-8'>
          <Link to='/home' className='w-8'>
            <img src={home} alt="icons" className='w- full h-full' />
          </Link>
          <Link to='/messages' className='w-8'>
            <img src={message} alt="icons" className='w- full h-full' />
          </Link>
          <Link to='/profile' className='w-8'>
            <img src={avatar} alt="icons" className='w- full h-full' />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar