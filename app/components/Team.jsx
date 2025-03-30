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
          const response = await fetch('/api/Team');
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
  const teamMembers = [
    {
      id: 1,
      name: 'Alice Johnson',
      role: 'Creative Director',
      image: '/api/placeholder/400/320',
      alt: 'Portrait of Alice Johnson',
      description: 'Alice brings a wealth of experience in creative direction and design strategy.'
    },
    {
      id: 2,
      name: 'Michael Smith',
      role: 'Lead Developer',
      image: '/api/placeholder/400/320',
      alt: 'Portrait of Michael Smith',
      description: 'Michael specializes in building scalable and innovative web applications.'
    },
    {
      id: 3,
      name: 'Sophia Lee',
      role: 'Marketing Strategist',
      image: '/api/placeholder/400/320',
      alt: 'Portrait of Sophia Lee',
      description: 'Sophia crafts marketing strategies that drive engagement and growth.'
    },
    {
      id: 4,
      name: 'James Brown',
      role: 'UI/UX Designer',
      image: '/api/placeholder/400/320',
      alt: 'Portrait of James Brown',
      description: 'James focuses on creating intuitive and visually stunning user experiences.'
    }
  ];
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
        {data.map((member) => (
          <div 
            key={member._id} 
            className="relative group overflow-hidden rounded-lg bg-gray-800 aspect-[4/3] p-4"
          >
            {/* Member Image */}
            <img
              src={member.image}
              alt={member.alt}
              className="w-full h-2/3 object-cover rounded-lg mb-4"
            />
            
            {/* Member Info */}
            <div className="text-center">
              <h3 className="text-xl font-serif text-white">{member.Name}</h3>
              <p className="text-sm text-gray-400">{member.Role}</p>
              <p className="text-xs text-gray-500 mt-2">Exp : {member.Exp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamShowcase ;