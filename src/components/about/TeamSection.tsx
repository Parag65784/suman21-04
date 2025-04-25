import React, { useEffect, useRef, useState } from 'react';
import { Linkedin, Twitter, Mail } from 'lucide-react';

export const TeamSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const team = [
    {
      name: "Rahul Sharma",
      role: "CEO & Founder",
      bio: "Former cricket analyst with 15+ years of experience in the sports betting industry.",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
    },
    {
      name: "Priya Patel",
      role: "Head of Analytics",
      bio: "Cricket statistician who has worked with major leagues around the world.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "Tech innovator with expertise in secure payment systems and AI-driven analytics.",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
    },
    {
      name: "Sarah Johnson",
      role: "Customer Experience",
      bio: "Dedicated to creating the most user-friendly betting platform in the industry.",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
    }
  ];

  return (
    <div 
      ref={sectionRef}
      className="py-20 bg-[#0A1929] relative overflow-hidden"
    >
      {/* Cricket themed pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute left-0 right-0 top-0 h-20 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute left-0 right-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet Our Team</h2>
          <div className="w-20 h-1 bg-[#1A8754] mx-auto mb-6" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The experts behind CrickWin's success, bringing together cricket knowledge and technological innovation
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <TeamMember 
              key={index}
              name={member.name}
              role={member.role}
              bio={member.bio}
              image={member.image}
              delay={300 + (index * 150)}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  delay: number;
  isVisible: boolean;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, bio, image, delay, isVisible }) => {
  return (
    <div 
      className={`group bg-gradient-to-br from-[#0D3158] to-[#0A2540] rounded-xl overflow-hidden shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative overflow-hidden h-72">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] to-transparent opacity-70"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
          <p className="text-[#F5B729] font-medium">{role}</p>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-300 mb-4">{bio}</p>
        
        <div className="flex space-x-3">
          <a href="#" className="text-gray-400 hover:text-[#F5B729] transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-400 hover:text-[#F5B729] transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-400 hover:text-[#F5B729] transition-colors">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};