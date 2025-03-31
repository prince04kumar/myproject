"use client";
import React, { useRef, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { MarqueeDemo } from "./Marque";

interface Blob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

const Landing = () => {
  const animationFrameId = useRef<number | null>(null);
  
  // Store both position and velocity for each blob
  const [blobs, setBlobs] = useState<Blob[]>([
    { 
      x: 20, y: 20, 
      vx: 0.2, vy: 0.3,  // Reduced initial velocities
      size: 60, opacity: 0.7 
    },
    { 
      x: 70, y: 60, 
      vx: -0.3, vy: 0.2,  // Reduced initial velocities
      size: 50, opacity: 0.8 
    },
    { 
      x: 40, y: 80, 
      vx: 0.15, vy: -0.25,  // Reduced initial velocities
      size: 70, opacity: 0.6 
    },
  ]);

  useEffect(() => {
    const animateBlobs = () => {
      setBlobs(prevBlobs => 
        prevBlobs.map(blob => {
          // Calculate new position
          let newX = blob.x + blob.vx;
          let newY = blob.y + blob.vy;
          let newVx = blob.vx;
          let newVy = blob.vy;
          
          // Bounce off edges with slight randomization
          if (newX <= 0 || newX >= 100 - blob.size/3) {
            newVx = -newVx * (0.8 + Math.random() * 0.4);
            // Add some randomness to the y velocity when hitting left/right walls
            newVy += (Math.random() - 0.5) * 0.2;  // Reduced randomness
          }
          
          if (newY <= 0 || newY >= 100 - blob.size/3) {
            newVy = -newVy * (0.8 + Math.random() * 0.4);
            // Add some randomness to the x velocity when hitting top/bottom walls
            newVx += (Math.random() - 0.5) * 0.2;  // Reduced randomness
          }
          
          // Apply small random changes to velocity for more natural movement
          newVx += (Math.random() - 0.5) * 0.02;  // Reduced random velocity change
          newVy += (Math.random() - 0.5) * 0.02;  // Reduced random velocity change
          
          // Limit maximum velocity to prevent too fast movement
          const maxSpeed = 1.0;  // Reduced maximum speed from 5.2 to 1.0
          const speed = Math.sqrt(newVx * newVx + newVy * newVy);
          if (speed > maxSpeed) {
            newVx = (newVx / speed) * maxSpeed;
            newVy = (newVy / speed) * maxSpeed;
          }
          
          // Ensure blobs stay within bounds
          newX = Math.max(0, Math.min(100 - blob.size/3, newX));
          newY = Math.max(0, Math.min(100 - blob.size/3, newY));

          // Clamp blob size to a maximum of 100vw
          const newSize = Math.min(blob.size, 100);
          
          // Slightly vary opacity for pulsing effect
          const newOpacity = blob.opacity + (Math.random() - 0.5) * 0.02;
          
          return {
            ...blob,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
            size: newSize,
            opacity: Math.max(0.4, Math.min(0.9, newOpacity))
          };
        })
      );
      
      animationFrameId.current = requestAnimationFrame(animateBlobs);
    };
    
    animateBlobs();
    
    // Cleanup function
    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);


  return (
    <div className="h-screen relative">
    {/* Background with glassmorphism overlay */}
    <div className="absolute h-screen w-screen overflow-hidden -z-10 bg-black/90">
        {/* Animated background blobs */}
        {blobs.map((blob, index) => (
          <div
            key={index}
            className="absolute rounded-full transition-transform duration-6000 ease-out w-screen overflow-hidden"
            style={{
              left: `${blob.x}%`,
              top: `${blob.y}%`,
              height: `${blob.size}vh`,
              width: `${blob.size}vw`,
              backgroundColor: `rgba(37, 99, 235, ${blob.opacity})`,
              filter: "blur(80px)",
              zIndex: 1,
              transition: "opacity 6s ease"
            }}
          ></div>
        ))}
        </div>

      <Navbar />  
      <div className="flex flex-col gap-1 items-center justify-center z-30 h-[80%] relative text-white ">
        <div className=" font-bold mt-6 p-6 flex flex-col justify-center md:items-center">
          <span className="font-mono text-4xl md:text-6xl lg:text-8xl">Evaluate Your Brand with</span>
          <br />
          <span className="font-playfair font-bold text-2xl md:text-4xl lg:text-6xl">
            Subscription Design service
          </span>
        </div>

        <div className="flex flex-col justify-center items-center gap-3 p-6">
          <h2>
            Our team of creative experts delivers stunning, high-quality designs
            tailored to your needs, ensuring your brand stands out in a crowded
            market.
          </h2>
          <div className="relative flex flex-col gap-3 rounded-2xl"></div>
        </div>

        <div className="w-[80%] flex justify-center">
          <section>
            <RainbowButton>Book a Call</RainbowButton>
          </section>
        </div>
        <div className="w-[80%] flex justify-center mt-7">
          Trusted By Leading Brands
        </div>
      </div>
      <div className="absolute bottom-10 w-full">
        <MarqueeDemo />
      </div>
    </div>
  );
};

export default Landing;