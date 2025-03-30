'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav 
      className='fixed top-0 left-0 w-full bg-transparent text-white z-50'
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='flex justify-between items-center p-5 md:p-10'>
        <div className='text-2xl font-bold'>
          <h2>LOGO</h2>
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
        <motion.div 
          className='flex flex-col items-center gap-4 bg-black bg-opacity-900 p-5 rounded-lg m-3 md:hidden '
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className='cursor-pointer hover:text-gray-300 transition'>Why Us</h3>
          <h3 className='cursor-pointer hover:text-gray-300 transition'>Projects</h3>
          <h3 className='cursor-pointer hover:text-gray-300 transition'>Testimonials</h3>
          <h3 className='cursor-pointer hover:text-gray-300 transition'>Teams</h3>
          <h3 className='cursor-pointer hover:text-gray-300 transition'>Pricing</h3>
          <h3 className='cursor-pointer hover:text-gray-300 transition'>FAQ</h3>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar
