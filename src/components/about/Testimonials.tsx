import React, { useEffect, useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Vikram Singh",
      location: "Mumbai, India",
      quote: "CrickWin has transformed how I engage with cricket matches. Their predictions are incredibly accurate, and the platform is easy to use.",
      rating: 5,
      image: "https://kpbkicpgqdsjdkbaghur.supabase.co/storage/v1/object/sign/contact/image-3.jpg"
    },
    {
      name: "James Wilson",
      location: "Chennai, IN",
      quote: "I've tried many cricket gaming platforms, but CrickWin stands out for its fairness and transparency. The payouts are quick, and customer service is excellent.",
      rating: 5,
      image: "https://kpbkicpgqdsjdkbaghur.supabase.co/storage/v1/object/sign/contact/image-1.jpg"
    },
    {
      name: "Abshike Kumar",
      location: "Delhi, India",
      quote: "As a lifelong cricket fan, I appreciate the depth of analysis that CrickWin provides. It helps me make informed decisions and enhances my enjoyment of the matches.",
      rating: 4,
      image: "https://kpbkicpgqdsjdkbaghur.supabase.co/storage/v1/object/sign/contact/image-1.jpg"
    }
  ];

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

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  // Auto-slide every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-white to-gray-100 dark:from-[#0D3158] dark:to-[#0A1929] transition-colors duration-500"
    >
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute w-20 h-20 rounded-full border-4 border-gray-400 dark:border-white top-[10%] left-[10%]" />
        <div className="absolute w-32 h-32 rounded-full border-4 border-gray-400 dark:border-white top-[30%] right-[15%]" />
        <div className="absolute w-16 h-16 rounded-full border-4 border-gray-400 dark:border-white bottom-[20%] left-[20%]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Users Say</h2>
          <div className="w-20 h-1 bg-[#1A8754] mx-auto mb-6" />
        </div>

        <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="bg-white dark:bg-gradient-to-br dark:from-[#0A2540] dark:to-[#0D3158] rounded-xl shadow-2xl p-8 md:p-12 overflow-hidden transition-colors duration-500">
            <div className="relative z-10">
              {/* Dot Indicators */}
              <div className="mb-8 flex justify-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    aria-label={`Go to testimonial ${index + 1}`}
                    className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${index === activeIndex ? 'bg-[#cb6ce6] scale-125' : 'bg-gray-400 dark:bg-gray-600'}`}
                    onClick={() => setActiveIndex(index)}
                  />
                ))}
              </div>

              {/* Content */}
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#004aad]">
                    <img
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].name}
                      onError={(e) => (e.currentTarget.src = "/fallback-avatar.png")}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#004aad] fill-[#cb6ce6]" />
                  ))}
                </div>

                <blockquote className="text-xl md:text-2xl text-gray-800 dark:text-white italic mb-6">
                  “{testimonials[activeIndex].quote}”
                </blockquote>

                <div className="text-[#004aad] font-bold text-lg mb-1">{testimonials[activeIndex].name}</div>
                <div className="text-gray-500 dark:text-gray-400">{testimonials[activeIndex].location}</div>
              </div>
            </div>

            {/* Decorative borders */}
            <div className="absolute top-0 left-0 w-40 h-40 opacity-10">
              <div className="w-full h-full rounded-full border-[8px] border-[#F5B729]"></div>
            </div>
            <div className="absolute bottom-0 right-0 w-60 h-60 opacity-10">
              <div className="w-full h-full rounded-full border-[8px] border-[#F5B729]"></div>
            </div>
          </div>

          {/* Arrows */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevTestimonial}
              className="bg-gray-200 dark:bg-[#0D3158] p-3 rounded-full text-gray-900 dark:text-white hover:bg-[#1A8754] transition-colors duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="bg-gray-200 dark:bg-[#0D3158] p-3 rounded-full text-gray-900 dark:text-white hover:bg-[#1A8754] transition-colors duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
