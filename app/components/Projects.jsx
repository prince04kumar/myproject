'use client'
import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

const ProjectShowcase = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        console.log(data);
        setProjects(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 flex items-center justify-center">
      <p>Loading projects...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 flex items-center justify-center">
      <p>Error loading projects: {error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4">
          View <span className="italic">Our Projects</span>
        </h2>
        <p className="text-sm md:text-base text-gray-300">
          See how our unique blend of flexibility, expertise, and innovation
          transforms each project into a standout success.
        </p>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
        {projects.map((project) => (
          <div 
            key={project._id} 
            className="relative group overflow-hidden rounded-lg bg-gray-900 aspect-[4/3]"
          >
            {/* Project Image */}
            <img
              src={project.alt || '/api/placeholder/400/320'}
              alt={project.alt}
              className="w-full h-full object-cover"
            />
            
            {/* Project Info */}
            <div className="absolute bottom-0 left-0 p-4 flex flex-col justify-end">
              <h3 className="text-xl font-serif">{project.title}</h3>
              <p className="text-sm text-gray-300">{project.category}</p>
            </div>
            
            {/* Arrow Icon */}
            <div className="absolute top-4 right-4">
              <ArrowUpRight className="w-5 h-5" />
            </div>
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectShowcase;