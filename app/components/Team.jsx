'use client'
import React,{useEffect, useState} from 'react';
import { ArrowUpRight } from 'lucide-react';



const TeamShowcase = () => {
  // Team data
const [data , setData] = useState([]);
const [Loading , setLoading] = useState(true);

    useEffect(() => {
      const fetchProjects = async () => {

        
        try {
         // setLoading(true);
          const response = await fetch('/api/team');
          if (!response.ok) {
            throw new Error('Failed to fetch projects');

          }
          const data = await response.json();
          console.log(data);
          setData(data);
          setLoading(false);
          
        } catch (err) {
          //setError(err.message);
          console.error('Error fetching projects:', err);
        } finally {
          //setLoading(false);
        }
      };
  
      fetchProjects();
    }, []);
  
  if(Loading) return (
    <div className='min-h-screen bg-black text-white p-4 md:p-8'>
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4 text-white">
          Meet <span className="italic">Our Team</span>
        </h2>
        <p className="text-sm md:text-base text-gray-400">
          Discover the talented individuals who drive our success and innovation.
        </p>
      </div>
        <h2 className='flex justify-center text-5xl'>
        Loading......
        </h2>
       
    </div>
  )
  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4 text-white">
          Meet <span className="italic">Our Team</span>
        </h2>
        <p className="text-sm md:text-base text-gray-400">
          Discover the talented individuals who drive our success and innovation.
        </p>
      </div>

      {/* Team Grid */}
     
    </div>
  );
};

export default TeamShowcase ;