import React, { useEffect, useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
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

  const testimonials = [
    {
      name: "Vikram Singh",
      location: "Mumbai, India",
      quote: "CrickWin has transformed how I engage with cricket matches. Their predictions are incredibly accurate, and the platform is easy to use.",
      rating: 5,
      image: "https://kpbkicpgqdsjdkbaghur.supabase.co/storage/v1/object/sign/contact/image-3.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjb250YWN0L2ltYWdlLTMuanBnIiwiaWF0IjoxNzQ2NDQxNTIxLCJleHAiOjE3Nzc5Nzc1MjF9.yhLcXyyM0fguDNGSwxUIOojeF1AZrnbWsAlcceJQ4J8"
    },
    {
      name: "James Wilson",
      location: "Chennai, IN",
      quote: "I've tried many cricket gaming platforms, but CrickWin stands out for its fairness and transparency. The payouts are quick, and customer service is excellent.",
      rating: 5,
      image: "https://kpbkicpgqdsjdkbaghur.supabase.co/storage/v1/object/sign/contact/image-1.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjb250YWN0L2ltYWdlLTEuanBnIiwiaWF0IjoxNzQ2NDQxNDQyLCJleHAiOjE3Nzc5Nzc0NDJ9.x-DLNdA--95ElJbeTtKBKU2vjrm2s0MZ4sXRm7OcR0E"
    },
    {
      name: "Abshike Kumar",
      location: "Delhi, India",
      quote: "As a lifelong cricket fan, I appreciate the depth of analysis that CrickWin provides. It helps me make informed decisions and enhances my enjoyment of the matches.",
      rating: 4,
      image: "https://kpbkicpgqdsjdkbaghur.supabase.co/storage/v1/object/sign/contact/image-1.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjb250YWN0L2ltYWdlLTEuanBnIiwiaWF0IjoxNzQ2NDQxNTUxLCJleHAiOjE3Nzc5Nzc1NTF9.2Gl-VXd2jwQ4LsK6tADdDg6MdiHfZvm0kNLVJtIbr2g"
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-[#0D3158] to-[#0A1929] relative overflow-hidden"
    >
      {/* Cricket themed pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-20 h-20 rounded-full border-4 border-white absolute top-[10%] left-[10%]"></div>
          <div className="w-32 h-32 rounded-full border-4 border-white absolute top-[30%] right-[15%]"></div>
          <div className="w-16 h-16 rounded-full border-4 border-white absolute bottom-[20%] left-[20%]"></div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Users Say</h2>
          <div className="w-20 h-1 bg-[#1A8754] mx-auto mb-6" />
        </div>
        
        <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="bg-gradient-to-br from-[#0A2540] to-[#0D3158] rounded-xl shadow-2xl p-8 md:p-12 overflow-hidden">
            <div className="relative z-10">
              <div className="mb-8 flex justify-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${index === activeIndex ? 'bg-[#F5B729]' : 'bg-gray-600'}`}
                    onClick={() => setActiveIndex(index)}
                  />
                ))}
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#F5B729]">
                    <img 
                      src={testimonials[activeIndex].image} 
                      alt={testimonials[activeIndex].name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#F5B729] fill-[#F5B729]" />
                  ))}
                </div>
                
                <blockquote className="text-xl md:text-2xl text-white italic mb-6">
                  "{testimonials[activeIndex].quote}"
                </blockquote>
                
                <div className="text-[#F5B729] font-bold text-lg mb-1">{testimonials[activeIndex].name}</div>
                <div className="text-gray-400">{testimonials[activeIndex].location}</div>
              </div>
            </div>
            
            {/* Decorative cricket elements */}
            <div className="absolute top-0 left-0 w-40 h-40 opacity-10">
              <div className="w-full h-full rounded-full border-[8px] border-[#F5B729]"></div>
            </div>
            <div className="absolute bottom-0 right-0 w-60 h-60 opacity-10">
              <div className="w-full h-full rounded-full border-[8px] border-[#F5B729]"></div>
            </div>
          </div>
          
          <div className="flex justify-between mt-8">
            <button 
              onClick={prevTestimonial} 
              className="bg-[#0D3158] p-3 rounded-full text-white hover:bg-[#1A8754] transition-colors duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextTestimonial} 
              className="bg-[#0D3158] p-3 rounded-full text-white hover:bg-[#1A8754] transition-colors duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};