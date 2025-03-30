import React from 'react';

const TechStackSection = () => {
  // Tech stack data organized by category
  const techStack = {
    frontend: [
      { name: "React", icon: "⚛️", proficiency: 95 },
      { name: "Next.js", icon: "N", proficiency: 90 },
      { name: "TypeScript", icon: "TS", proficiency: 85 },
      { name: "Tailwind", icon: "~", proficiency: 95 }
    ],
    backend: [
      { name: "Node.js", icon: "JS", proficiency: 90 },
      { name: "Python", icon: "🐍", proficiency: 85 },
      { name: "MongoDB", icon: "🍃", proficiency: 88 },
      { name: "PostgreSQL", icon: "🐘", proficiency: 85 }
    ],
    tools: [
      { name: "AWS", icon: "☁️", proficiency: 92 },
      { name: "Docker", icon: "🐳", proficiency: 88 },
      { name: "Git", icon: "🔄", proficiency: 94 },
      { name: "Figma", icon: "🎨", proficiency: 90 }
    ]
  };

  // Function to render tech category
  const renderTechCategory = (category, title) => (
    <div className="mb-16">
      <h3 className="text-xl md:text-2xl mb-6 flex items-center">
        <span className="text-blue-500 mr-2">/</span> {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {category.map((tech, index) => (
          <div 
            key={index} 
            className="bg-[#140521] rounded-lg p-6 transition-all duration-300 hover:bg-[#040C21]"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-900/50 rounded-md flex items-center justify-center mr-3 text-2xl">
                {tech.icon}
              </div>
              <span className="text-white text-lg">{tech.name}</span>
            </div>
            <div className="h-2 bg-purple-900/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-gray-600 to-red-500" 
                style={{ width: `${tech.proficiency}%` }}
              />
            </div>
            <div className="mt-2 text-sm text-purple-300">{tech.proficiency}% Proficiency</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
            Our Tech Stack
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-base md:text-lg">
            We use cutting-edge technologies to build scalable and performant solutions. Our 
            expertise spans across various domains of modern software development.
          </p>
        </div>

        {/* Tech Categories */}
        {renderTechCategory(techStack.frontend, "Frontend")}
        {renderTechCategory(techStack.backend, "Backend")}
        {renderTechCategory(techStack.tools, "Tools & Platforms")}
      </div>
    </div>
  );
};

export default TechStackSection;