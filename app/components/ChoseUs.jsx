import React from 'react';
import { Wallet, TrendingUp, Calendar } from 'lucide-react';
import { TerminalDemo } from './Terminal';

const DesignServicesPage = () => {
  return (
    <div className="min-h-screen bg-black relative text-white flex flex-col items-center justify-center px-4 py-16">
      {/* Main Heading with Playfair Display font */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
          Why <span className="italic">Choose Us</span>
        </h1>
        
        <div className="max-w-3xl mx-auto border border-blue-400 p-4 md:p-6">
          <p className="text-base md:text-lg text-center">
            At Svarog, we seamlessly blend flexibility, deep expertise, and cutting-edge innovation to deliver top design services tailored to your needs.
          </p>
        </div>
      </div>
      
      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 max-w-6xl w-full">
        <div>
          
        {/* Feature 1 */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-6">
            <Wallet size={36} className="text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-serif mb-3">Subscription Flexibility</h2>
          <p className="text-sm md:text-base text-gray-300">
            Enjoy the freedom of a flexible subscription model that adapts to your needs.
          </p>
        </div>
        
        {/* Feature 2 */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-6">
            <TrendingUp size={36} className="text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-serif mb-3">Consistent Quality</h2>
          <p className="text-sm md:text-base text-gray-300">
            Receive high-quality designs, ensuring your brand always looks its best.
          </p>
        </div>
        
        {/* Feature 3 */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-6">
            <Calendar size={36} className="text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-serif mb-3">Timely Delivery</h2>
          <p className="text-sm md:text-base text-gray-300">
            Depend on our reliable team to deliver your projects on time, every time.
          </p>
        </div>
        
        </div>
        <TerminalDemo/>
      </div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-700 opacity-20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-700 opacity-20 rounded-full filter blur-3xl"></div>
    </div>
  );
};

export default DesignServicesPage;