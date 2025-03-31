"use client";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative w-full py-10 overflow-hidden">
      {/* Blue fade background gradient */}
      <div 
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black to-blue-950/20 pointer-events-none" 
        style={{ 
          backgroundImage: "radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.15), transparent 70%)",
          backgroundColor: "black", // Fallback color for browsers that don't support gradients
          opacity: 1 // Ensure the gradient is visible
        }}
      />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-white">
          {/* Logo and subscription section */}
          <div className="space-y-6">
            <div className="flex items-center">
              <svg width="100" height="40" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 12C28.5228 12 33 16.4772 33 22C33 27.5228 28.5228 32 23 32C17.4772 32 13 27.5228 13 22C13 16.4772 17.4772 12 23 12ZM43 12C48.5228 12 53 16.4772 53 22C53 27.5228 48.5228 32 43 32C37.4772 32 33 27.5228 33 22C33 16.4772 37.4772 12 43 12ZM63 12C68.5228 12 73 16.4772 73 22C73 27.5228 68.5228 32 63 32C57.4772 32 53 27.5228 53 22C53 16.4772 57.4772 12 63 12Z" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
            <p className="text-sm text-gray-300">
              Made remotely with ❤️ and passion <br />
              ~ Westhill Studio
            </p>
            <div className="flex space-x-2">
              <input 
                type="email" 
                placeholder="Enter Your Email..." 
                className="bg-gray-900/60 border border-gray-700 text-white w-full max-w-[220px] px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" 
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-md transition">
                Subscribe Us
              </button>
            </div>
          </div>

          {/* Template Pages section */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Template Pages</h3>
            <nav className="flex flex-col space-y-2 text-sm text-gray-300">
              <Link href="/" className="hover:text-blue-400 transition">Home</Link>
              <Link href="/about" className="hover:text-blue-400 transition">About</Link>
              <Link href="/portfolio" className="hover:text-blue-400 transition">Portfolio</Link>
              <Link href="/contact" className="hover:text-blue-400 transition">Contact</Link>
              <Link href="/faq" className="hover:text-blue-400 transition">FAQ</Link>
            </nav>
          </div>

          {/* Social section */}
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">Social</h3>
                <nav className="flex flex-col space-y-2 mt-4 text-sm text-gray-300">
                  <Link href="#" className="hover:text-blue-400 transition">Twitter (X)</Link>
                  <Link href="#" className="hover:text-blue-400 transition">Instagram</Link>
                  <Link href="#" className="hover:text-blue-400 transition">Youtube</Link>
                  <Link href="#" className="hover:text-blue-400 transition">Framer</Link>
                </nav>
              </div>
              <div>
                <p className="text-sm text-gray-400">Sales - 7,360,109</p>
                <div className="mt-4 h-20 w-28 relative overflow-hidden rounded-md">
                  <div className="absolute inset-0 bg-blue-950/30 rounded-md"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 7.5L15 15L19.5 12L15 9M12 7.5L9 4.5L4.5 9L9 13.5M12 7.5L9 15L4.5 12L9 9" stroke="#4F8EF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="9" stroke="#4F8EF7" strokeWidth="1.5"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright and policies */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-6 border-t border-gray-800 text-sm text-gray-400">
          <p>© 2024 Mandiro Design</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/terms" className="hover:text-white transition">Terms & Conditions</Link>
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;