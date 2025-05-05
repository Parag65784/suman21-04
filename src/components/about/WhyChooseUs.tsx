import React, { useEffect, useRef, useState } from 'react';
import { Target, Shield, Award, Zap, BarChart, Clock } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
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

  return (
    <div 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-[#0A1929] to-[#0D1F33] relative overflow-hidden"
    >
      {/* Cricket ball stitching pattern as background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-[40%] h-[40%] border-[15px] border-dashed border-white rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30%] h-[30%] border-[10px] border-dashed border-white rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose Us</h2>
          <div className="w-20 h-1 bg-[#1A8754] mx-auto mb-6" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We combine passion for cricket with cutting-edge technology to deliver an unmatched gaming experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Target className="w-10 h-10" />} 
            title="Fair Play" 
            description="Transparent odds and instant payouts ensure a fair gaming experience for all users."
            delay={300}
            isVisible={isVisible}
          />
          
          <FeatureCard 
            icon={<Shield className="w-10 h-10" />} 
            title="Security" 
            description="Advanced encryption and secure payment gateways protect your data and funds."
            delay={450}
            isVisible={isVisible}
          />
          
          <FeatureCard 
            icon={<Award className="w-10 h-10" />} 
            title="Experience" 
            description="User-friendly interface combined with expert cricket insights and analysis."
            delay={600}
            isVisible={isVisible}
          />
          
          <FeatureCard 
            icon={<Zap className="w-10 h-10" />} 
            title="Fast Payouts" 
            description="Instant withdrawals and deposits with multiple payment options for your convenience."
            delay={750}
            isVisible={isVisible}
          />
          
          <FeatureCard 
            icon={<BarChart className="w-10 h-10" />} 
            title="Expert Analysis" 
            description="Access to professional cricket analysis and predictions to make informed bets."
            delay={900}
            isVisible={isVisible}
          />
          
          <FeatureCard 
            icon={<Clock className="w-10 h-10" />} 
            title="24/7 Support" 
            description="Our dedicated customer support team is available round the clock to assist you."
            delay={1050}
            isVisible={isVisible}
          />
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  isVisible: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay, isVisible }) => {
  return (
    <div 
      className={`bg-gradient-to-br from-[#0A2540] to-[#0A1929] p-8 rounded-xl shadow-xl border border-[#1A3A5C] hover:border-[#1A8754] transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-1000 delay-${delay} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 text-[#cb6ce6] mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};