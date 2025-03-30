import React from 'react';
import { motion } from 'framer-motion';

interface AuroraBackgroundProps {
  children?: React.ReactNode;
  colors?: string[];
  blur?: number;
}

const AuroraBackground: React.FC<AuroraBackgroundProps> = ({ 
  children, 
  colors = ['rgba(59,130,246,0.3)', 'rgba(147,51,234,0.3)', 'rgba(16,185,129,0.3)'], 
  blur = 60 
}) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Aurora Blobs */}
      <motion.div 
        className="absolute top-[-10%] left-[-50%] w-[200%] h-[200%] bg-opacity-20"
        initial={{ rotate: 0 }}
        animate={{ 
          rotate: 360,
          transition: {
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      >
        {colors.map((color, index) => (
          <motion.div
            key={color}
            className="absolute w-[40%] h-[40%] rounded-full mix-blend-overlay"
            style={{
              backgroundColor: color,
              top: `${15 * index}%`,
              left: `${25 * index}%`,
              filter: `blur(${blur}px)`,
              opacity: 0.3
            }}
            animate={{
              scale: [1, 1.1, 1],
              translate: [
                '0% 0%', 
                '5% 10%', 
                '0% 0%'
              ],
              transition: {
                duration: 15,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: "easeInOut"
              }
            }}
          />
        ))}
      </motion.div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default AuroraBackground;