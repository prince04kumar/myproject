'use client'
import React, { useState } from 'react';

const TestimonialsSection = () => {
  // State to track which testimonial is hovered
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const testimonials = [
    {
      id: 1,
      text: "Svarog's expertise and innovative approach transformed our website and brand identity. The results were beyond our expectations, and their attention to detail was impeccable.",
      author: "John Smith",
      role: "CEO",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 2,
      text: "Svarog's blend of flexibility and deep design bench is invaluable. Their ability to adapt to our evolving needs while delivering exceptional design has made them an essential partner.",
      author: "Michael Brown",
      role: "Creative Lead",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 3,
      text: "Svarog brought our brand vision to life with their exception design skills and innovative approach. Their creative solutions helped us stand out in a crowded market.",
      author: "James Lee",
      role: "Brand Strategist",
      avatar: "/api/placeholder/40/40",
      emoji: "🙌 🙌 🙌"
    },
    {
      id: 4,
      text: "Working with Svarog was a game-changer for our brand. Their team delivered creative solutions that perfectly captured our vision.",
      author: "Jane Doe",
      role: "Marketing Director",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 5,
      text: "Svarog's designs perfectly captured our brand's essence, reflecting its unique voice and professionalism. The entire process both smooth and enjoyable.",
      author: "Sophia Martinez",
      role: "Creative Director",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 6,
      text: "The team at Svarog not only met but far exceeded all our expectations with their stunning work and highly collaborative service. Their innovative approach and attention to detail played a crucial role.",
      author: "David Clark",
      role: "Business Owner",
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 7,
      text: "Svarog's innovative design solutions significantly improved our digital campaigns. Their branding and marketing touch gave key life to our campaigns success.",
      author: "Laura Wilson",
      role: "Marketing Manager",
      avatar: "/api/placeholder/40/40",
      emoji: "❤️"
    },
    {
      id: 8,
      text: "Svarog's team delivered outstanding design work that transformed our product's interface and experience, making a real difference.",
      author: "Robert Johnson",
      role: "Product Designer",
      avatar: "/api/placeholder/40/40"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 relative overflow-hidden">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4 text-white">
          What <span className="italic">Customers Say</span>
        </h2>
        <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto">
          Discover how our design services have helped them achieve their goals 
          and surpass their expectations.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto relative z-10">
        {testimonials.map((testimonial, index) => (
          <div 
            key={testimonial.id} 
            className={`bg-gray-800 bg-opacity-40 backdrop-blur-sm p-6 rounded-lg transition-all duration-300 transform ${hoveredIndex === index ? 'scale-105 bg-opacity-60' : 'scale-100'}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <p className="text-sm text-gray-400 mb-4 line-clamp-4">
              "{testimonial.text}"
            </p>
            {testimonial.emoji && (
              <p className="text-lg mb-4">{testimonial.emoji}</p>
            )}
            <div className="flex items-center mt-4">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <img 
                  src={testimonial.avatar} 
                  alt={`${testimonial.author} avatar`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-sm text-white">{testimonial.author}</p>
                <p className="text-xs text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Background blur elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-700 opacity-20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-700 opacity-20 rounded-full filter blur-3xl"></div>
    </div>
  );
};

export default TestimonialsSection;