import React from 'react'
import hero from "../assets/hero.png"
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <div className='bg-[#BECBF7] h-screen flex flex-col justify-center items-start pt-8'>
        <h1 className='text-[#009CBB] text-2xl font-bold capitalize px-6 font-raleway'>anons</h1>
        <div className='my-8 '>
            <img src={hero} alt="hero img" className='w-full h-full' />
        </div>
        <div className='px-6 text-[#009CBB] font-raleway'>
            <p className='text-4xl font-bold'>Speak The Word, <br />Say Your Mind.</p>
            <p className='leading-5 pt-4 text-xl'>Say what you think anonymously without <br /> being known. Say your mind</p>
        </div>
        <Link to="/register" className='flex w-full'>
            <button className='w-full py-4 px-2 text-white bg-[#009CBB] mx-6 font-raleway text-lg text-center my-4 rounded-lg font-semibold'>Get started</button>
        </Link>
    </div>
  )
}

export default Welcome