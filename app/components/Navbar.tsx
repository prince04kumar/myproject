'use client'
import React, { useState } from 'react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div 
      className='fixed top-0 left-0 h-[10vh] w-full text-white z-50 backdrop-blur bg-black bg-opacity-20'
    >
      <div className='flex justify-between items-center p-5'>
        <div className='text-2xl font-bold flex gap-5 justify-center items-center'>
          <img src="/digitalCube.png" className='h-12 w-11 rounded-lg' alt="" /> <h2>DIGITALCUBE</h2>
        </div>
        <div className='hidden md:flex gap-6 text-lg'>
          <h3 className='cursor-pointer hover:text-gray-300 transition'>Why Us</h3>
          <h3 className='cursor-pointer hover:text-gray-300 transition'>Projects</h3>
          <h3 className='cursor-pointer hover:text-gray-300 transition'>Testimonials</h3>
          <h3 className='cursor-pointer hover:text-gray-300 transition'>Teams</h3>
          <h3 className='cursor-pointer hover:text-gray-300 transition'>Pricing</h3>
          <h3 className='cursor-pointer hover:text-gray-300 transition'>FAQ</h3>
        </div>
        <div className='md:hidden'>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className='text-xl focus:outline-none'
          >
            {isMenuOpen ? '✖' : '☰'}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div 
          className='flex flex-col items-center gap-4 bg-black bg-opacity-90 backdrop-blur p-5 rounded-lg m-3 md:hidden'
        >
          <h3 className='cursor-pointer hover:text-gray-300 transition'>Why Us</h3>
          <h3 className='cursor-pointer hover:text-gray-300 transition'>Projects</h3>
          <h3 className='cursor-pointer hover:text-gray-300 transition'>Testimonials</h3>
          <h3 className='cursor-pointer hover:text-gray-300 transition'>Teams</h3>
          <h3 className='cursor-pointer hover:text-gray-300 transition'>Pricing</h3>
          <h3 className='cursor-pointer hover:text-gray-300 transition'>FAQ</h3>
        </div>
      )}
    </div>
  )
}

export default Navbar
