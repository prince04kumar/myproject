"use client";
import React, { useRef, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { RainbowButton } from "@/components/magicui/rainbow-button";

const Landing = () => {
  const videoRef = useRef(null);
  const [positions, setPositions] = useState([
    { top: "10%", left: "10%" },
    { bottom: "6%", right: "4%" },
    { top: "30%", left: "30%" },
  ]);

  useEffect(() => {
    if (videoRef.current) {
      // You can adjust this value to control the speed
      // 0.5 = half speed, 0.25 = quarter speed, etc.
      // videoRef.current.playbackRate = 0.5;
    }

    const interval = setInterval(() => {
      setPositions([
        {
          top: `${Math.random() * 50}%`,
          left: `${Math.random() * 50}%`,
        },
        {
          bottom: `${Math.random() * 50}%`,
          right: `${Math.random() * 50}%`,
        },
        {
          top: `${Math.random() * 50}%`,
          left: `${Math.random() * 50}%`,
        },
      ]);
    }, 3000); // Change position every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen relative">
      {/* Video Background */}
      {/* <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        src="./bluebg.mp4"
        autoPlay
        loop
        muted
      /> */}
      <div className="absolute h-screen w-screen bg-black">
        <div
          className="bg-blue-900 z-20 h-[60vh] w-[40vw] blur-3xl rounded-full animate-pulse-move"
          style={positions[0]}
        ></div>
        <div
          className="bg-blue-900 z-20 h-[60vh] w-[40vw] blur-3xl absolute rounded-full animate-pulse-move"
          style={positions[1]}
        ></div>
        <div
          className="bg-blue-900 z-20 h-[60vh] w-[40vw] blur-3xl absolute rounded-full animate-pulse-move"
          style={positions[2]}
        ></div>
      </div>

      <Navbar />
      <div className="flex flex-col gap-5 items-center justify-center z-30 h-[80%] relative text-white ">
        <div className="text-3xl md:text-6xl lg:textfont-bold mt-6 p-6">
          <span className="font-mono">Evaluate Your Brand with</span>
          <br />
          <span className="font-playfair font-bold">
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
    </div>
  );
};

export default Landing;

// Add the following Tailwind CSS configuration to your global CSS or Tailwind config file
// to define the custom animation `pulse-move`:
// @keyframes pulse-move {
//   0%, 100% {
//     transform: translate(0, 0) scale(1);
//   }
//   50% {
//     transform: translate(10px, 10px) scale(1.1);
//   }
// }
// .animate-pulse-move {
//   animation: pulse-move 3s infinite;
// }
