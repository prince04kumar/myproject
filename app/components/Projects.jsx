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
        const response = await fetch("/api/Projects");
        
        const data = await response.json();
        console.log ("data:" ,data);
        setProjects(data.projects || []);
        console.log(typeof data);

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
    <div className="min-h-screen bg-black text-white p-4 md:p-8 relative">
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
            key={project.id} 
            className="relative group overflow-hidden rounded-lg bg-gray-900 aspect-[4/3]"
          >
            {/* Project Image - Fixed the image URL */}
            <img
              src={`/api/Projects/${project.id}`}
              alt={project.title || "Project image"}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error(`Failed to load image for project: ${project.id}`);
                e.target.src = '/digitalCube.png'; // Fallback image
                e.target.className = "w-full h-full object-contain bg-gray-800";
              }}
            />
            
            {/* Project Info */}
            <div className="absolute bottom-0 left-0 p-4 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent w-full">
              <h3 className="text-xl font-serif">{project.title}</h3>
              <p className="text-sm text-gray-300">{project.description}</p>
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
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-700 opacity-20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-700 opacity-20 rounded-full filter blur-3xl"></div>
    </div>
  );
};

export default ProjectShowcase;